// src/pages/About.tsx
const About = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">About R.A.C.E</h1>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-gray-600 mb-4">
          R.A.C.E (Race Walking Analysis & Compliance Evaluation) is a platform
          designed to help analyze race walking technique using advanced AI.
        </p>
        <p className="text-gray-600 mb-4">
          Our system uses computer vision and machine learning to detect and analyze
          compliance with race walking rules in uploaded videos.
        </p>
      </div>
    </div>
  );
};

export default About;
