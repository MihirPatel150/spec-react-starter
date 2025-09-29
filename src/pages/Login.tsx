import { LoginForm } from "@/components/auth/LoginForm";

export default function Login() {
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
                Efficient Resource Allocation for Academic Excellence
              </h2>
              <p className="text-lg opacity-90 max-w-md mx-auto">
                Streamline access to GPU servers, lab equipment, and institutional resources with our comprehensive management platform.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <h3 className="font-semibold mb-2">Smart Scheduling</h3>
                <p className="opacity-80">Automated conflict resolution and optimal resource allocation</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <h3 className="font-semibold mb-2">Real-time Updates</h3>
                <p className="opacity-80">Live availability status and instant notifications</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}