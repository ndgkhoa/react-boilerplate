import { Button } from '~/components/ui';

const Dashboard = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-7xl/none">
              Welcome to Our Platform
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Discover amazing features and boost your productivity with our innovative solutions.
            </p>
          </div>
          <div className="space-x-4">
            <Button size="large" type="primary">
              Get Started
            </Button>
            <Button size="large">Learn More</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
