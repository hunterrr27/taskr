import Link from "next/link"

export function Footer() {
    return (
      <footer className="border-t mt-auto">
        <div className="container flex flex-col items-center justify-between gap-2 py-4 md:h-14 md:flex-row md:py-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            2025. All rights reserved.
          </p>
          <nav className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/terms" className="hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    )
}