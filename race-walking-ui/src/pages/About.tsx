const About = () => {
  // Placeholder team data
  const teamMembers = [
    { name: "Andrew Lancaster", email: "andrew.lancaster@drexel.edu" },
    { name: "Reynardo Alfian", email: "reynardo.alfian@drexel.edu" },
    { name: "Paul Acakah", email: "paul.acakah@drexel.edu" },
    { name: "Jabbar Shah", email: "jabbar.shah@drexel.edu" },
    { name: "Amna Zuberi", email: "amna.zuberi@drexel.edu" },
    { name: "Nazli Karaman", email: "nazli.karaman@drexel.edu" },
    { name: "Matthew Tekimang", email: "matthew.tekimang@drexel.edu" },
  ];

  return (
    <div className="max-w-5xl mx-auto text-center px-6 py-12">
      {/* Heading Section */}
      <h1 className="text-4xl font-bold">WHO ARE WE?</h1>
      <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
        R.A.C.E is a tech-driven initiative leveraging AI and Computer Vision to
        transform race-walking analysis. Our mission is to empower athletes and coaches 
        with precise, real-time feedback for rule compliance and peak performance.
      </p>

      {/* Team Section */}
      <h2 className="text-2xl font-semibold mt-12">Our Team</h2>
      <div className="mt-6 flex flex-wrap justify-center gap-6">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-black text-white rounded-lg shadow-md p-4 w-48 flex flex-col items-center">
            <div className="w-20 h-20 bg-gray-300 rounded-full mb-3" /> {/* Placeholder Image */}
            <h3 className="text-lg font-semibold">{member.name}</h3>
            <p className="text-sm text-gray-300">{member.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
