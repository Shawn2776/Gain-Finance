export default function HeroSection() {
  return (
    <section className="w-full flex justify-center mx-auto py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Welcome to my Channel
            </h1>
            <p className="mx-auto w-full text-muted-foreground md:text-xl">
              Join our community and discover amazing content.
            </p>
          </div>
          <div className="space-x-4">
            <button className="btn btn-lg">Sign In, Yo</button>
          </div>
        </div>
      </div>
    </section>
  );
}
