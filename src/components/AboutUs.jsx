import Image from "next/image";

export default function AboutUs() {
  return (
 <div className="w-full bg-bg-light py-6">
  
  {/* Text Section */}
  <div className="text-center mb-4 px-4">
    <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl text-text-dark">
      Here We Are!
    </h1>
    <p className="text-gray-600 max-w-lg mx-auto mt-2">
      Dedicated educators, developers, and mentors working together to help you achieve real results.
    </p>
  </div>

  {/* Image Section */}
  <div className="relative w-11/12 mx-auto aspect-[5/3]">
    <Image
      src="/assets/captens.png"
      fill
      alt="captens"
      className="object-contain object-center"
    />
  </div>

</div>
  );
}