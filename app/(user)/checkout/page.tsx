"use client";
import Modal from "@/components/modal/Modal";
import { useCart } from "@/context/CartContext";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import { client } from "@/sanity/lib/client";
import { Trash2} from "lucide-react";
import Link from "next/link";

const bangladeshDistricts = [
  "Dhaka", // 1
  "Faridpur", // 2
  "Gazipur", // 3
  "Gopalganj", // 4
  "Jamalpur", // 5
  "Kishoreganj", // 6
  "Madaripur", // 7
  "Manikganj", // 8
  "Munshiganj", // 9
  "Mymensingh", // 10
  "Narayanganj", // 11
  "Narsingdi", // 12
  "Netrokona", // 13
  "Rajbari", // 14
  "Shariatpur", // 15
  "Sherpur", // 16
  "Tangail", // 17
  "Bogura", // 18
  "Joypurhat", // 19
  "Naogaon", // 20
  "Natore", // 21
  "Nawabganj", // 22
  "Pabna", // 23
  "Rajshahi", // 24
  "Sirajgonj", // 25
  "Dinajpur", // 26
  "Gaibandha", // 27
  "Kurigram", // 28
  "Lalmonirhat", // 29
  "Nilphamari", // 30
  "Panchagarh", // 31
  "Rangpur", // 32
  "Thakurgaon", // 33
  "Barguna", // 34
  "Barishal", // 35
  "Bhola", // 36
  "Jhalokati", // 37
  "Patuakhali", // 38
  "Pirojpur", // 39
  "Bandarban", // 40
  "Brahmanbaria", // 41
  "Chandpur", // 42
  "Chattogram", // 43
  "Cumilla", // 44
  "Cox's Bazar", // 45
  "Feni", // 46
  "Khagrachari", // 47
  "Lakshmipur", // 48
  "Noakhali", // 49
  "Rangamati", // 50
  "Habiganj", // 51
  "Maulvibazar", // 52
  "Sunamganj", // 53
  "Sylhet", // 54
  "Bagerhat", // 55
  "Chuadanga", // 56
  "Jashore", // 57
  "Jhenaidah", // 58
  "Khulna", // 59
  "Kushtia", // 60
  "Magura", // 61
  "Meherpur", // 62
  "Narail", // 63
  "Satkhira", // 64
];

type User = {
  _id: string;
  userID: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  addresses: Address[];
};

type Address = {
  _id: string;
  street: string;
  city: string;
  district: string;
};

export default function CheckoutPage() {
  const { cart, totalPrice } = useCart();
  const DELIVERY_CHARGE = 100;
  const grandTotal = totalPrice + DELIVERY_CHARGE;

  const [paymentMethod, setPaymentMethod] = useState("cash");

  const { user } = useUser();
  const [userData, setUserData] = useState<User | null>(null);

  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);

  const [newAddress, setNewAddress] = useState<Address>({
    _id: uuidv4(),
    street: "",
    city: "",
    district: "",
  });

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  //
  const handleDeleteAddress = (addressId: string) => {
    // Make sure the user object exists and has the addresses
    if (userData && userData.addresses) {
      const updatedAddresses = userData.addresses.filter(
        (address) => address._id !== addressId
      );

      // Update the user document with the new addresses, but this time only patch the address field
      client
        .patch(userData._id)
        .unset([
          `addresses[${userData.addresses.findIndex((address) => address._id === addressId)}]`,
        ]) // Unset the specific address
        .commit()
        .then(() => {
          // After the patch operation, update the UI state with the new addresses
          setUserData((prevUserData) => {
            if (!prevUserData) return null;
            return { ...prevUserData, addresses: updatedAddresses };
          });
        })
        .catch((error) => {
          console.error("Error deleting address:", error);
        });
    }
  };

  //
  const handleAddAddress = () => {
    if (userData && userData._id) {
      const addressToAdd = {
        _key: uuidv4(),
        street: newAddress.street,
        city: newAddress.city,
        district: newAddress.district,
      };

      client
        .patch(userData._id) // Patch the user document by their _id
        .setIfMissing({ addresses: [] }) // Ensure addresses array exists
        .append("addresses", [addressToAdd]) // Append new address to the addresses array
        .commit()
        .then((updatedUser: unknown) => {
          // Assert as User
          const user = updatedUser as User;

          // Proceed with updating user data
          setUserData(user); // Set the updated user data
          setShowModal(false); // Close the modal after saving
          setNewAddress({ _id: uuidv4(), street: "", city: "", district: "" }); // Reset the form
        })
        .catch((error) => {
          console.error("Error adding address:", error);
        });
    }
  };

  const [isLoading, setIsLoading] = useState(true);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      client
        .fetch<User[]>(`*[_type == "user" && userID == $userID]`, {
          userID: user.id,
        })
        .then((data) => {
          if (data?.length > 0) {
            setUserData(data[0]);
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [user]);

  const handlePlaceOrder = async () => {
    if (!user) {
      alert("User not found!");
      return;
    }
  
    if (!selectedAddress || selectedAddress.trim() === "") {
      alert("Please select a shipping address.");
      return;
    }
  
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }
  
    setIsPlacingOrder(true);
  
    const orderID = uuidv4();
    const invoiceID = `INV-${Date.now()}`;
    const orderDate = new Date().toISOString();
  
    const addressDetails = userData?.addresses.find(
      (addr) => addr._id === selectedAddress
    );
  
    if (!addressDetails) {
      alert("Selected address not found. Please try again.");
      setIsPlacingOrder(false);
      return;
    }
  
    const newOrder = {
      _type: "order",
      orderID,
      userID: user.id,
      name: `${user.firstName} ${user.lastName}`,
      total: grandTotal,
      products: cart.map((item) => item.id),
      status: "Pending",
      invoiceID,
      date: orderDate,
      address: addressDetails,
    };
  
    try {
      await client.create(newOrder);
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };
  

  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">
          Your cart is empty.
          <Link href="/shop" className="text-indigo-600 hover:underline">
            {" "}
            Continue Shopping
          </Link>
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left: User Information */}
          <div className="md:col-span-2 flex flex-col">
            <div className=" bg-white shadow-md border border-slate-300 rounded-md p-6 mb-6">
              <h2 className="text-base font-semibold mb-4">Your Order</h2>
              {cart.map((item) => (
                <div
                  key={item.slug}
                  className="border-t border-slate-300 py-1 flex items-center gap-2"
                >
                  <Image
                    src={urlFor(item.image).url()}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="rounded-md size-10"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{item.name}</p>
                    <div className="flex justify-between">
                      <p className="text-gray-600">
                        ৳ {item.price.toFixed(2)} × {item.quantity}
                      </p>
                      <p className="text-gray-600">
                        ৳ {(item.quantity! * item.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-between border-t border-slate-300 py-2 mt-4">
                <p>Subtotal</p>
                <p>৳ {totalPrice.toFixed(2)}</p>
              </div>
              <div className="flex justify-between border-t border-slate-300 py-2">
                <p>Shipping</p>
                <p>৳ {DELIVERY_CHARGE.toFixed(2)}</p>
              </div>
              <div className="flex justify-between font-bold text-lg border-t border-slate-300 py-2">
                <p>Total</p>
                <p>৳ {grandTotal.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white shadow-md border border-slate-300 p-6 rounded-md  max-h-[80vh] overflow-y-auto">
              <h2 className="text-base font-semibold ">Shipping Address</h2>

              {isLoading ? (
                <p className="text-gray-500 mt-4">Loading addresses...</p>
              ) : userData?.addresses.length === 0 ? (
                <p className="text-gray-500 mt-4">
                  No shipping address found. Please add your address.
                </p>
              ) : (
                <div className="mt-6">
                  {/* Show all addresses as radio buttons */}
                  <div className="space-y-4 mt-4">
                    {userData?.addresses.map((address) => (
                      <label
                        key={address._id || `${address.street}-${address.city}`}
                        className="flex items-center gap-3 border border-slate-300 p-4 rounded-md cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="selectedAddress"
                          value={address._id}
                          checked={selectedAddress === address._id}
                          onChange={() => setSelectedAddress(address._id)}
                          className="h-4 w-4"
                        />
                        <div className="flex justify-between w-full">
                          <div className="ml-2">
                            <p className="text-gray-700">
                              {address.street}, {address.city}
                            </p>
                            <p className="text-gray-500">{address.district}</p>
                          </div>
                          {/* Delete Button */}
                          <Trash2
                            onClick={() => handleDeleteAddress(address._id)}
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                            size={20}
                          />
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Add New Address Button */}
              <button
                onClick={() => setShowModal(true)}
                className="border-2 font-semibold border-slate-300 py-2 px-8 rounded-md mt-6 w-full"
              >
                Add New Address
              </button>

              {/* modal */}

              {/* Modal for Adding Address */}
              {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                  <h2 className="text-lg font-semibold mb-4">Add Address</h2>

                  {/* Street */}
                  <input
                    type="text"
                    name="street"
                    placeholder="Street"
                    value={newAddress.street}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-slate-300 rounded-md mb-3"
                  />

                  {/* City */}
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={newAddress.city}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-slate-300 rounded-md mb-3"
                  />

                  {/* District */}
                  <select
                    name="district"
                    value={newAddress.district}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-slate-300 rounded-md mb-3"
                  >
                    <option value="" disabled>
                      Select Your District
                    </option>
                    {bangladeshDistricts.sort().map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>

                  {/* Save Button */}
                  <button
                    onClick={handleAddAddress}
                    className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md"
                  >
                    Save Address
                  </button>
                </Modal>
              )}
            </div>

            {/* Right: Order Summary & Payment */}
            <div className="bg-white shadow-md border border-slate-300 rounded-md p-6 mt-6">
              <h2 className="text-base font-semibold mb-4">Payment Method</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={() => setPaymentMethod("cash")}
                  />
                  Cash on Delivery
                </label>
                {/* <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bkash"
                    checked={paymentMethod === "bkash"}
                    onChange={() => setPaymentMethod("bkash")}
                  />
                  bKash
                </label> */}
              </div>
              <div className="mt-4">
                <hr className="my-2 border-slate-300" />

                {/*  */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={isPlacingOrder}
                  className={`mt-4 w-full bg-indigo-600 text-white py-2 rounded-md ${
                    isPlacingOrder ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isPlacingOrder ? "Placing Order..." : "Place Order"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
