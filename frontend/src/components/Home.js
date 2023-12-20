import React from 'react';
import './Home.css';
function Home() {
  return (
    <div className='container'>
    <>
      <header>
        <h1 className='w'>Welcome to EPI-USE Africa</h1>
      </header>

      <section>
        <h2>About Us</h2>
        <p>
          EPI-USE Africa is a dynamic organization committed to revolutionizing employee hierarchy management through innovative cloud-based solutions.
        </p>
      </section>

      <section className="requirements">
        <h2>Assessment Requirements</h2>
        <p>
          EPI-USE Africa is in need of a cutting-edge, cloud-hosted application to efficiently manage its organization's employee hierarchy. The application should empower users to seamlessly create, read, update, and delete employee records, while also providing control over the reporting structure by enabling the designation of reporting line managers for each employee.
        </p>
        {/* Add additional requirement details here */}
        <p>
          Our aim is to optimize the reporting structure, disallowing employees from being their own managers. Exceptions are granted for specific roles, such as the CEO, who may not have a direct manager. The essential employee data set includes crucial details such as name, surname, birth date, employee number, salary, role/position, and reporting line manager.
        </p>

        
      </section>

      <section className="solution">
        <h2>Our Solution</h2>
        <p>
          At EPI-USE Africa, we envision deploying an advanced cloud-based application that ensures accessibility and scalability. The integration of Gravatar adds a personalized touch to employee profiles, allowing each employee to have an avatar profile picture linked to their data. While the application does not mandate users to upload profile pictures, the provision for this feature is considered a nice-to-have option.
        </p>
        {/* Add more details about the solution, such as architecture, design patterns, and technologies */}
        <p>
          We recommend leveraging cloud platforms like Heroku, Firebase, AWS, or GCP for deployment, ensuring the system's availability through a provided URL.
        </p>
        {/* You can also add images or visual representations here if needed */}

       



      </section>
       <section className="images">
        
        <img className='ele1' src="ele.webp" alt="Elephant WebP" />
        <img className='CSP' src="CSP.jpg" alt="Elephant WebP" />
        <img className='use' src="use.png" alt="Elephant WebP" />
        <img className='eleu' src="eleu.jpeg" alt="Elephant WebP" />
        <img className='ele3' src="ele2.jpeg" alt="Elephant 2 JPEG" />
      </section>
    </>
    </div>
  );
}

export default Home;

