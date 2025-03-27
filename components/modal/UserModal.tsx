// import { useState } from 'react';
// import Modal from './Modal';

// const bangladeshDistricts = [
//     "Dhaka", // 1
//     "Faridpur", // 2
//     "Gazipur", // 3
//     "Gopalganj", // 4
//     "Jamalpur", // 5
//     "Kishoreganj", // 6
//     "Madaripur", // 7
//     "Manikganj", // 8
//     "Munshiganj", // 9
//     "Mymensingh", // 10
//     "Narayanganj", // 11
//     "Narsingdi", // 12
//     "Netrokona", // 13
//     "Rajbari", // 14
//     "Shariatpur", // 15
//     "Sherpur", // 16
//     "Tangail", // 17
//     "Bogura", // 18
//     "Joypurhat", // 19
//     "Naogaon", // 20
//     "Natore", // 21
//     "Nawabganj", // 22
//     "Pabna", // 23
//     "Rajshahi", // 24
//     "Sirajgonj", // 25
//     "Dinajpur", // 26
//     "Gaibandha", // 27
//     "Kurigram", // 28
//     "Lalmonirhat", // 29
//     "Nilphamari", // 30
//     "Panchagarh", // 31
//     "Rangpur", // 32
//     "Thakurgaon", // 33
//     "Barguna", // 34
//     "Barishal", // 35
//     "Bhola", // 36
//     "Jhalokati", // 37
//     "Patuakhali", // 38
//     "Pirojpur", // 39
//     "Bandarban", // 40
//     "Brahmanbaria", // 41
//     "Chandpur", // 42
//     "Chattogram", // 43
//     "Cumilla", // 44
//     "Cox's Bazar", // 45
//     "Feni", // 46
//     "Khagrachari", // 47
//     "Lakshmipur", // 48
//     "Noakhali", // 49
//     "Rangamati", // 50
//     "Habiganj", // 51
//     "Maulvibazar", // 52
//     "Sunamganj", // 53
//     "Sylhet", // 54
//     "Bagerhat", // 55
//     "Chuadanga", // 56
//     "Jashore", // 57
//     "Jhenaidah", // 58
//     "Khulna", // 59
//     "Kushtia", // 60
//     "Magura", // 61
//     "Meherpur", // 62
//     "Narail", // 63
//     "Satkhira", // 64
//   ];

// const UserModal = ({ onClose, onSave }: { onClose: () => void; onSave: (newAddress: any) => void }) => {
//   const [newAddress, setNewAddress] = useState({
//     firstName: '',
//     lastName: '',
//     street: '',
//     city: '',
//     district: '',
//     mobile: '',
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setNewAddress((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleAddAddress = () => {
//     onSave(newAddress); // Save the new address
//     onClose(); // Close the modal
//   };

//   return (
//     <Modal onClose={onClose}>
//       <h2 className="text-lg font-semibold mb-4">Add New Address</h2>

//       {/* First Name & Last Name (One Row) */}
//       <div className="flex gap-2">
//         <input
//           type="text"
//           name="firstName"
//           placeholder="First Name"
//           value={newAddress.firstName}
//           onChange={handleInputChange}
//           className="w-1/2 p-2 border rounded-md mb-2"
//         />
//         <input
//           type="text"
//           name="lastName"
//           placeholder="Last Name"
//           value={newAddress.lastName}
//           onChange={handleInputChange}
//           className="w-1/2 p-2 border rounded-md mb-2"
//         />
//       </div>

//       {/* Street */}
//       <input
//         type="text"
//         name="street"
//         placeholder="Street"
//         value={newAddress.street}
//         onChange={handleInputChange}
//         className="w-full p-2 border rounded-md mb-2"
//       />

//       {/* City */}
//       <input
//         type="text"
//         name="city"
//         placeholder="City"
//         value={newAddress.city}
//         onChange={handleInputChange}
//         className="w-full p-2 border rounded-md mb-2"
//       />

//       {/* District */}
//       <select
//         name="district"
//         value={newAddress.district}
//         onChange={handleInputChange}
//         className="w-full p-2 border rounded-md mb-2"
//       >
//         <option value="" disabled>
//           Select Your District
//         </option>
//         {bangladeshDistricts.sort().map((district) => (
//           <option key={district} value={district}>
//             {district}
//           </option>
//         ))}
//       </select>

//       {/* Mobile Number */}
//       <input
//         type="tel"
//         name="mobile"
//         placeholder="Mobile Number"
//         value={newAddress.mobile}
//         onChange={handleInputChange}
//         className="w-full p-2 border rounded-md mb-2"
//       />

//       {/* Save Button */}
//       <button
//         onClick={handleAddAddress}
//         className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md"
//       >
//         Save Address
//       </button>
//     </Modal>
//   );
// };

// export default UserModal;
