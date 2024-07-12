// import React, { useState } from 'react';
// import br1 from '../src/Bracelets/1.png';
// import br2 from '../src/Bracelets/2.png';
// import br3 from '../src/Bracelets/3.png';
// import nk1 from '../src/Necklace/1.png'
// import nk2 from '../src/Necklace/2.png'
// import nk3 from '../src/Necklace/3.png'
// import nk4 from '../src/Necklace/4.png'
// import axios from 'axios';

// const Jewelry = ({ onSelectJewelry }) => {
//   const [selectedImages, setSelectedImages] = useState({});

//   const jewelryImages = {
//     Necklace: [nk1, nk2, nk3, nk4],
//     Bracelet: [br1, br2, br3],
//     Ring: ['ring1.jpg', 'ring2.jpg', 'ring3.jpg', 'ring4.jpg'],
//     Earring: ['earring1.jpg', 'earring2.jpg', 'earring3.jpg', 'earring4.jpg'],
//   };

//   const handleImageSelect = async (type, image) => {
//     try {
//       const response = await fetch(image);
//       const blob = await response.blob();
//       const reader = new FileReader();

//       reader.onloadend = async () => {
//         const base64data = reader.result;
//         try {
//           const response = await axios.post(`http://13.126.15.191:8005/upload_${type.toLowerCase()}`, { image: base64data }, {
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           });

//           const jewelryId = response.data[`${type.toLowerCase()}_id`];
//           onSelectJewelry({ type, id: jewelryId });
//           setSelectedImages((prevSelectedImages) => ({
//             ...prevSelectedImages,
//             [type]: image,
//           }));
//         } catch (error) {
//           console.error(`Error uploading ${type} image:`, error);
//         }
//       };

//       reader.readAsDataURL(blob);
//     } catch (error) {
//       console.error(`Error fetching image ${image}:`, error);
//     }
//   };

//   return (
//     <div className="row">
//       {Object.keys(jewelryImages).map((type) => (
//         <div key={type} className="col-md-3">
//           <h3>{type}</h3>
//           {jewelryImages[type].map((image, index) => (
//             <div key={index} className="mb-3 text-center">
//               <img
//                 src={image}
//                 alt={`${type} ${index + 1}`}
//                 className="img-fluid"
//                 style={{
//                   opacity: selectedImages[type] === image ? '0.6' : '1',
//                 }}
//               />
//               <button
//                 className={`btn btn-primary mt-2 ${selectedImages[type] === image ? 'selected-image' : ''}`}
//                 onClick={() => handleImageSelect(type, image)}
//               >
//                 Select
//               </button>
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Jewelry;

import React, { useState } from 'react';
import br1 from '../src/assets/assets/Bracelets/1.png';
import br2 from '../assets/Bracelets/2.png';
import br3 from '../assets/Bracelets/3.png';
import nk1 from '../assets/Necklace/1.png';
import nk2 from '../assets/Necklace/2.png';
import nk3 from '../assets/Necklace/3.png';
import nk4 from '../assets/Necklace/4.png';
import rn1 from '../assets/Rings/1.png';
import rn2 from '../assets/Rings/2.png';
import rn3 from '../assets/Rings/3.png';
import rn4 from '../assets/Rings/4.png';
import axios from 'axios';
import er1 from '../assets/Ear_Ring/1.png'
import er2 from '../assets/Ear_Ring/2.png'
import er3 from '../assets/Ear_Ring/3.png'
import er4 from '../assets/Ear_Ring/4.png'
import '../App.css'; // Import custom CSS

const Jewelry = ({ onSelectJewelry }) => {
  const [selectedImages, setSelectedImages] = useState({});

  const jewelryImages = {
    Necklace: [nk1, nk2, nk3, nk4],
    Bracelet: [br1, br2, br3],
    Ring: [rn1, rn2, rn3, rn4],
    Earring: [er1,er2,er3,er4],
  };

  const handleImageSelect = async (type, image) => {
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64data = reader.result;
        try {
          const response = await axios.post(`http://13.126.15.191:8005/upload_${type.toLowerCase()}`, { image: base64data }, {
            headers: {
              'Content-Type': 'application/json',
            },
          });

          const jewelryId = response.data[`${type.toLowerCase()}_id`];
          onSelectJewelry({ type: type.toLowerCase(), id: jewelryId });
          setSelectedImages((prevSelectedImages) => ({
            ...prevSelectedImages,
            [type]: image,
          }));
        } catch (error) {
          console.error(`Error uploading ${type} image:`, error);
        }
      };

      reader.readAsDataURL(blob);
    } catch (error) {
      console.error(`Error fetching image ${image}:`, error);
    }
  };

  return (
    <div className="container">
      {Object.keys(jewelryImages).map((type) => (
        <div key={type} className="mb-4">
          <h3>{type}</h3>
          <div className="row">
            {jewelryImages[type].map((image, index) => (
              <div key={index} className="col-md-3 text-center">
                <div className="card d-flex justify-content-center align-items-center">
                  <img
                    src={image}
                    alt={`${type} ${index + 1}`}
                    className="card-img-top jewelry-image"
                    style={{
                      opacity: selectedImages[type] === image ? '0.6' : '1',
                    }}
                  />
                  <div className="card-body">
                    <button
                      className={`btn btn-primary ${selectedImages[type] === image ? 'selected-image' : ''}`}
                      onClick={() => handleImageSelect(type, image)}
                    >
                      Select
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Jewelry;
