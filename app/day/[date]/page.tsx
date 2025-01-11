'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/utils/supabase'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { format } from 'date-fns'

interface Task {
  id: string
  name: string
  start_time: string
  end_time: string
  date: string
}

export default function DayView() {
  const { date } = useParams()
  const [tasks, setTasks] = useState<Task[]>([])
  const router = useRouter()
  const [newTask, setNewTask] = useState({
    name: '',
    start_time: '',
    end_time: '',
  })
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  
  const handleBackToDashboard = () => {
    router.push('/dashboard')
  }

  useEffect(() => {
    const fetchTasks = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data, error } = await supabase
          .from('tasks')
          .select('*')
          .eq('date', date)
          .eq('user_id', user.id)
          .order('start_time');
  
        if (error) {
          console.error('Error fetching tasks:', error);
        } else {
          setTasks(data || []);
        }
      }
    };
  
    fetchTasks();
  }, [date]);

  const handleCreateTask = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        alert('You must be logged in to create tasks');
        return;
      }
  
      const { data, error } = await supabase
        .from('tasks')
        .insert({
          ...newTask,
          date,
          user_id: user.id
        })
        .select()
  
      if (error) {
        console.error('Error creating task:', error);
        alert('Failed to create task: ' + error.message);
      } else {
        setTasks([...tasks, data[0]]);
        setNewTask({ name: '', start_time: '', end_time: '' });
        setIsDialogOpen(false);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('An unexpected error occurred');
    }
  }

  const handleEditTask = async () => {
    if (!editingTask) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        alert('You must be logged in to edit tasks');
        return;
      }

      const { error } = await supabase
        .from('tasks')
        .update({
          name: editingTask.name,
          start_time: editingTask.start_time,
          end_time: editingTask.end_time,
        })
        .eq('id', editingTask.id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error updating task:', error);
        alert('Failed to update task: ' + error.message);
      } else {
        setTasks(tasks.map(task => 
          task.id === editingTask.id ? editingTask : task
        ));
        setEditingTask(null);
        setIsEditDialogOpen(false);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('An unexpected error occurred');
    }
  }

  const handleDeleteTask = async () => {
    if (!editingTask) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        alert('You must be logged in to delete tasks');
        return;
      }

      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', editingTask.id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error deleting task:', error);
        alert('Failed to delete task: ' + error.message);
      } else {
        setTasks(tasks.filter(task => task.id !== editingTask.id));
        setEditingTask(null);
        setIsEditDialogOpen(false);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('An unexpected error occurred');
    }
  }

  const timeSlots = Array.from({ length: 17 }, (_, i) => {
    const hour = i + 6
    return `${hour.toString().padStart(2, '0')}:00`
  })

  const getTaskDisplay = (task: Task) => {
    const startHour = parseInt(task.start_time.split(':')[0])
    const endHour = parseInt(task.end_time.split(':')[0])
    const startMinute = parseInt(task.start_time.split(':')[1])
    const endMinute = parseInt(task.end_time.split(':')[1])
    
    // Calculate where in the slot it should start (as a percentage)
    const topOffset = (startMinute / 60) * 100
    
    // Calculate duration in hours including partial hours
    const durationInMinutes = ((endHour - startHour) * 60) + (endMinute - startMinute)
    const heightPercent = (durationInMinutes / 60) * 100

    return {
      topOffset,
      heightPercent
    }
  }

  const getTasksForTimeSlot = (timeSlot: string) => {
    const hour = parseInt(timeSlot.split(':')[0])
    
    return tasks.filter(task => {
      const taskStartHour = parseInt(task.start_time.split(':')[0])
      return taskStartHour === hour
    })
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="flex justify-center text-2xl font-bold mb-4">
        Schedule for {format(new Date(date.toString().replace(/-/g, '/')), 'MM/dd/yyyy')}
      </h1>
      <div className='flex justify-around mb-4'>
        <Button variant="outline" onClick={handleBackToDashboard}>Back to Calendar</Button>
        <Button onClick={() => setIsDialogOpen(true)}>Create Task</Button>
      </div>
      
      <div className="grid grid-cols-[5rem_1fr] divide-y">
        {timeSlots.map((time) => {
          const slotsForThisTime = getTasksForTimeSlot(time)
          
          return (
            <div key={time} className="contents">
              <div className="h-[3rem] relative border-t">
                <div className="absolute w-full right-2 text-right text-sm text-gray-600" style={{ top: '0%' }}>
                  {time}
                </div>
              </div>
              <div className="min-h-[3rem] relative">
                {slotsForThisTime.map((task) => {
                  const display = getTaskDisplay(task)
                  return (
                    <div
                      key={task.id}
                      className="bg-blue-100 p-2 rounded cursor-pointer hover:bg-blue-200 absolute inset-x-0 mx-1 flex items-center"
                      style={{
                        top: `${display.topOffset}%`,
                        height: `${display.heightPercent}%`,
                        zIndex: 10
                      }}
                      onDoubleClick={() => {
                        setEditingTask(task)
                        setIsEditDialogOpen(true)
                      }}
                    >
                      {task.name}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Create Task Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Task Name"
              value={newTask.name}
              onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
            />
            <Input
              type="time"
              placeholder="Start Time"
              value={newTask.start_time}
              onChange={(e) => setNewTask({ ...newTask, start_time: e.target.value })}
            />
            <Input
              type="time"
              placeholder="End Time"
              value={newTask.end_time}
              onChange={(e) => setNewTask({ ...newTask, end_time: e.target.value })}
            />
            <Button onClick={handleCreateTask}>Create Task</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Task Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {editingTask && (
              <>
                <Input
                  placeholder="Task Name"
                  value={editingTask.name}
                  onChange={(e) => setEditingTask({ ...editingTask, name: e.target.value })}
                />
                <Input
                  type="time"
                  placeholder="Start Time"
                  value={editingTask.start_time}
                  onChange={(e) => setEditingTask({ ...editingTask, start_time: e.target.value })}
                />
                <Input
                  type="time"
                  placeholder="End Time"
                  value={editingTask.end_time}
                  onChange={(e) => setEditingTask({ ...editingTask, end_time: e.target.value })}
                />
                <div className="flex justify-between">
                  <Button onClick={handleEditTask}>Save Changes</Button>
                  <Button variant="destructive" onClick={handleDeleteTask}>Delete Task</Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
