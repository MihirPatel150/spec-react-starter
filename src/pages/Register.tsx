import { RegisterForm } from "@/components/auth/RegisterForm";

export default function Register() {
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        <div className="hidden lg:block text-center text-white">
          <div className="space-y-6">
            <div className="flex items-center justify-center space-x-3">
              <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                <span className="text-white font-bold text-2xl">N</span>
              </div>
              <div className="text-left">
                <h1 className="text-4xl font-bold">NITC</h1>
                <p className="text-xl opacity-90">Resource Management</p>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold">
                Join the Digital Campus Revolution
              </h2>
              <p className="text-lg opacity-90 max-w-md mx-auto">
                Get instant access to campus resources, submit requests, and track your usage history with a single account.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 text-sm max-w-sm mx-auto">
              <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-left">
                <h3 className="font-semibold mb-2">✓ Browse Available Resources</h3>
                <p className="opacity-80">Explore GPUs, lab equipment, and more</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-left">
                <h3 className="font-semibold mb-2">✓ Submit & Track Requests</h3>
                <p className="opacity-80">Easy booking with real-time status updates</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-left">
                <h3 className="font-semibold mb-2">✓ View Usage History</h3>
                <p className="opacity-80">Complete logs of your resource utilization</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}