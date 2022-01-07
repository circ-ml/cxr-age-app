export default function About() {
  const links = [
    { title: "CXR-Age Github", url: "https://github.com/vineet1992/CXR-Age" },
    {
      title:
        "Paper – Deep Learning to Assess Cardiovascular Age From Chest Radiographs",
      url: "https://www.ahajournals.org/doi/abs/10.1161/circ.142.suppl_3.313",
    },
    {
      title:
        "Paper – Deep Learning to Assess Long-term Mortality From Chest Radiographs",
      url: "https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2738349",
    },
    {
      title:
        "Presentation at the American Heart Association – Deep Learning to Assess Cardiovascular Age From Chest Radiographs",
      url: "https://pubmed.ncbi.nlm.nih.gov/33744131/",
    },
    {
      title:
        "Understanding of Convolutional Neural Network (CNN) — Deep Learning",
      url: "https://medium.com/@RaghavPrabhu/understanding-of-convolutional-neural-network-cnn-deep-learning-99760835f148",
    },
  ];
  return (
    <div className="p-6 md:px-12 md:py-16">
      <div className="prose lg:prose-xl mx-auto">
        <p>
          Chest X-Rays (CXRs) are the most common diagnostic imaging tests in
          medicine. Although many present no abnormalities, other, currently
          unused information including posture, heart size, and spinal shape may
          inform risk of future disease. Our lab has shown that new artificial
          intelligence techniques (deep learning) can extract this prognostic
          information from CXRs to aid in disease prediction and prevention.
          Leveraging large clinical trial databases with CXR images, our lab has
          developed deep learning models to estimate “chest x-ray age” - a
          number in years that captures how healthy the chest x-ray appears
          overall (CXR-Age). This represents an individual’s biological age
          which aims to measure the effects of aging on an individual’s health.
          Using biological age may be useful in multiple risk calculators, like
          estimating a patient’s risk for cardiovascular disease. Many of these
          nationally used calculators use chronological age, which does not
          fully capture the effects of aging on an individual. Using CXR-Age
          will improve the predictive power of these calculators and of
          cardiovascular events.
        </p>
        <p>
          CXR-Age is a convolutional neural network (CNN) and was developed
          using CXR data from over 100,000 individuals from publicly available
          cohorts. A CNN model takes an input image and the computer views it as
          a matrix of numbers. There are filters which pass over this matrix to
          pick up on specified relationships between the values representing the
          pixels of the image. Filters can be used to pick up edges, vertical
          lines, etc. The result of passing a filter over the image is called a
          feature map which depicts where the certain features specified by the
          filter were on the original image. This first set of feature maps is
          called the convolution layer. Then, additional filters can be used on
          these generated feature maps to create another layer, and another,
          resulting in multiple connected layers, representing a network.
        </p>
        <p>
          Please reference our publications and links for additional
          information:
        </p>
        <ul>
          {links.map((e, i) => (
            <li key={i}>
              <a target="_blank" rel="noreferrer" href={e.url}>
                {e.title}
              </a>
            </li>
          ))}
        </ul>
        <p>
          This application was built by Gabriel Romualdo and Dr. Vineet Raghu.
        </p>
      </div>
    </div>
  );
}
