import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs"
import { ArrowLeft, Loader } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

function BackgroundDetails() {
  return (
    <>
      <div className="pointer-events-none absolute left-[8%] top-[18%] hidden font-mono text-xs text-primary/20 lg:block">{'{'} community: true {'}'}</div>
      <div className="pointer-events-none absolute bottom-[16%] right-[8%] hidden font-mono text-xs text-accent/20 lg:block">npm run grow<span className="cursor-blink">_</span></div>
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
    </>
  )
}

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-5 py-10 sm:px-8">
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-50" />
      <BackgroundDetails />
      <div className="relative z-10 flex w-full max-w-md flex-col gap-8 p-2">
        <div className="flex items-center justify-between">
            <Image
                src={"/logo.png"}
                alt='logo'
                width={150}
                height={150}
            />
            <Link 
                href="/" 
                className="flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
                <ArrowLeft className="size-3.5" /> Back home
            </Link>
        </div>
        <ClerkLoading>
            <Loader className="mx-auto animate-spin text-primary" />
        </ClerkLoading>
        <ClerkLoaded>
            <div className="flex items-center justify-center">
                {children}
            </div>
        </ClerkLoaded>
        <p className="text-center font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/50">Build with curiosity · ship with confidence</p>
      </div>
    </main>

  )
}

export default AuthLayout