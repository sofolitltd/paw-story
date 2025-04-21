"use client";
import Modal from "@/components/modal/Modal";
import { useCart } from "@/context/CartContext";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import { client } from "@/sanity/lib/client";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const bangladeshDistricts = [
  "Dhaka",
  "Faridpur",
  "Gazipur",
  "Gopalganj",
  "Jamalpur",
  "Kishoreganj",
  "Madaripur",
  "Manikganj",
  "Munshiganj",
  "Mymensingh",
  "Narayanganj",
  "Narsingdi",
  "Netrokona",
  "Rajbari",
  "Shariatpur",
  "Sherpur",
  "Tangail",
  "Bogura",
  "Joypurhat",
  "Naogaon",
  "Natore",
  "Nawabganj",
  "Pabna",
  "Rajshahi",
  "Sirajgonj",
  "Dinajpur",
  "Gaibandha",
  "Kurigram",
  "Lalmonirhat",
  "Nilphamari",
  "Panchagarh",
  "Rangpur",
  "Thakurgaon",
  "Barguna",
  "Barishal",
  "Bhola",
  "Jhalokati",
  "Patuakhali",
  "Pirojpur",
  "Bandarban",
  "Brahmanbaria",
  "Chandpur",
  "Chattogram",
  "Cumilla",
  "Cox's Bazar",
  "Feni",
  "Khagrachari",
  "Lakshmipur",
  "Noakhali",
  "Rangamati",
  "Habiganj",
  "Maulvibazar",
  "Sunamganj",
  "Sylhet",
  "Bagerhat",
  "Chuadanga",
  "Jashore",
  "Jhenaidah",
  "Khulna",
  "Kushtia",
  "Magura",
  "Meherpur",
  "Narail",
  "Satkhira",
];

type User = {
  _id: string;
  userID: string;
  name: string;
  email: string;
  mobile: string;
  addresses: Address[];
};

type Address = {
  _id: string;
  name: string;
  mobile: string;
  email: string;
  street: string;
  city: string;
  district: string;
};

export default function CheckoutPage() {
  const { cart, totalPrice } = useCart();
  const { user } = useUser();
  const router = useRouter();

  const [deliveryArea, setDeliveryArea] = useState<"inside" | "outside">(
    "outside"
  );
  const DELIVERY_CHARGE = deliveryArea === "inside" ? 60 : 100;
  const grandTotal = totalPrice + DELIVERY_CHARGE;

  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [userData, setUserData] = useState<User | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [newAddress, setNewAddress] = useState<Address>({
    _id: uuidv4(),
    name: "",
    mobile: "",
    email: "",
    street: "",
    city: "",
    district: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [isAddressUpdating, setIsAddressUpdating] = useState(false);

  useEffect(() => {
    if (!user) return;

    console.log("Fetching user data from Sanity for UID:", user.id);
    setIsLoading(true);

    client
      .fetch<User[]>(`*[_type == "user" && userID == $userID]`, {
        userID: user.id,
      })
      .then(async (data) => {
        if (data?.length) {
          console.log("User data loaded:", data[0]);
          setUserData(data[0]);
        } else {
          console.warn("No user document found for UID:", user.id);
          // Create new user in Sanity
          const newUser = {
            _id: uuidv4(),
            _type: "user",
            userID: user.id,
            name: user.fullName || "Unknown",
            email: user.primaryEmailAddress?.emailAddress || "",
            mobile: "", // Or fetch from Clerk if available
            addresses: [
              {
                _id: uuidv4(),
                name: "",
                mobile: "",
                email: "",
                street: "",
                city: "",
                district: "",
              },
            ],
          };

          const createdUser = await client.create(newUser);
          console.log("Created new user in Sanity:", createdUser);
          setUserData(createdUser);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch/create user in Sanity:", err);
      })
      .finally(() => setIsLoading(false));
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleDeleteAddress = (addressId: string) => {
    if (userData?.addresses) {
      setIsAddressUpdating(true);
      const updatedAddresses = userData.addresses.filter(
        (addr) => addr._id !== addressId
      );
      client
        .patch(userData._id)
        .unset([
          `addresses[${userData.addresses.findIndex((addr) => addr._id === addressId)}]`,
        ])
        .commit()
        .then(() => {
          setUserData((prev) =>
            prev ? { ...prev, addresses: updatedAddresses } : null
          );
          if (selectedAddress && selectedAddress._id === addressId) {
            setSelectedAddress(null);
          }
        })
        .catch(console.error)
        .finally(() => setIsAddressUpdating(false));
    }
  };

  //
  const handleAddAddress = () => {
    if (
      !newAddress.name ||
      !newAddress.mobile ||
      !newAddress.email ||
      !newAddress.street ||
      !newAddress.city ||
      !newAddress.district
    ) {
      alert("Please fill in all address fields.");
      return;
    }
    if (!userData) {
      console.warn("Cannot add address — userData is null.");
      alert("User data not loaded. Please wait and try again.");
      return;
    }

    if (userData) {
      setIsAddressUpdating(true);

      const addressToAdd = {
        _key: uuidv4(), // Ensure the address has a unique _key
        _id: uuidv4(),
        name: newAddress.name.trim(),
        email: newAddress.email.trim(),
        mobile: newAddress.mobile.trim(),
        street: newAddress.street.trim(),
        city: newAddress.city.trim(),
        district: newAddress.district,
      };

      console.log("Adding address:", addressToAdd);

      client
        .patch(userData._id)
        .setIfMissing({ addresses: [] })
        .append("addresses", [addressToAdd])
        .commit()
        .then(() => {
          console.log(
            "Address added successfully. Fetching updated user data..."
          );
          return client.fetch<User[]>(
            `*[_type == "user" && userID == $userID]`,
            {
              userID: userData.userID,
            }
          );
        })
        .then((data) => {
          if (data?.length) {
            console.log("Updated user data fetched.");
            setUserData(data[0]);
            setShowModal(false);
            setNewAddress({
              _id: uuidv4(),
              name: "",
              mobile: "",
              email: "",
              street: "",
              city: "",
              district: "",
            });
          } else {
            console.warn("No user data returned after address add.");
          }
        })
        .catch((err) => {
          console.error("Failed to add address:", err);
          alert("Something went wrong while adding the address.");
        })
        .finally(() => setIsAddressUpdating(false));
    } else {
      console.warn("No user data available when trying to add address.");
    }
  };

  const handlePlaceOrder = async () => {
    if (!user || !selectedAddress || !paymentMethod)
      return alert("Missing order information.");
    setIsPlacingOrder(true);

    try {
      await client.create({
        _type: "order",
        orderID: uuidv4(),
        userID: user.id,
        name: `${user.firstName} ${user.lastName}`,
        total: grandTotal,
        products: cart.map((item) => ({
          _key: uuidv4(),
          _type: "reference",
          _ref: item.id,
        })),
        status: "Pending",
        invoiceID: `INV-${Date.now()}`,
        date: new Date().toISOString(),
        address: `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.district}`,
      });
      router.push("/order/success");
      setIsPlacingOrder(false);
    } catch (err) {
      console.error("Order Error:", err);
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
          Your cart is empty.{" "}
          <Link href="/shop" className="text-indigo-600 hover:underline">
            Continue Shopping
          </Link>
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* Left Side */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <div className="bg-white shadow-md border border-slate-300 p-6 rounded-md">
              <h2 className="text-base font-semibold">Shipping Address</h2>
              {isLoading ? (
                <p className="text-gray-500 mt-4">Loading addresses...</p>
              ) : (userData?.addresses?.length ?? 0) === 0 ? (
                <p className="text-gray-500 mt-4">
                  No shipping address found. Please add your address.
                </p>
              ) : (
                <div className="mt-4 space-y-4">
                  {userData?.addresses.map((address) => (
                    <label
                      key={address._id}
                      className="flex gap-5 items-start border border-slate-300 p-4 rounded-md cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="selectedAddress"
                        value={address._id}
                        checked={selectedAddress === address}
                        onChange={() => setSelectedAddress(address)}
                        className="h-4 w-4 flex-shrink-0 mt-1.5"
                      />
                      <div className="flex flex-col w-full gap-1">
                        <p className=" font-bold text-xl">{address.name}</p>
                        <p>{address.mobile}</p>
                        <p>{address.email}</p>
                        <p>
                          {address.street}, {address.city},{" "}
{address.district}
                        </p>
                      </div>
                      {isAddressUpdating ? (
                        <div className="animate-spin h-5 w-5 border-2 border-t-2 border-red-500 rounded-full"></div>
                      ) : (
                        <Trash2
                          onClick={() => handleDeleteAddress(address._id)}
                          className="text-red-500 hover:text-red-700 cursor-pointer"
                          size={20}
                        />
                      )}
                    </label>
                  ))}
                </div>
              )}
              <button
                onClick={() => setShowModal(true)}
                className="border-2 border-slate-300 py-2 px-8 rounded-md mt-6 font-semibold"
              >
                Add New Address
              </button>
              {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                  <h2 className="text-lg font-semibold mb-4">Add Address</h2>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={newAddress.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-slate-300 rounded-md mb-3"
                  />
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="Mobile Number"
                    value={newAddress.mobile}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-slate-300 rounded-md mb-3"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={newAddress.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-slate-300 rounded-md mb-3"
                  />
                  <input
                    type="text"
                    name="street"
                    placeholder="Street"
                    value={newAddress.street}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-slate-300 rounded-md mb-3"
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={newAddress.city}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-slate-300 rounded-md mb-3"
                  />
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
                  <button
                    onClick={handleAddAddress}
                    className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md"
                    disabled={isAddressUpdating}
                  >
                    {isAddressUpdating ? (
                      <div className="animate-spin mx-auto h-5 w-5 border-4 border-t-4 border-white rounded-full"></div>
                    ) : (
                      "Save Address"
                    )}
                  </button>
                </Modal>
              )}
            </div>

            <div className="bg-white shadow-md border border-slate-300 p-6 rounded-md">
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
                        ৳{" "}
                        {(
                          Number(item.quantity ?? 1) * Number(item.price)
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side */}
          <div className="bg-white shadow-md border border-slate-300 rounded-md p-6 flex flex-col gap-4 h-fit">
            <div>
              <div className="flex justify-between border-b border-slate-300 pb-2 mb-2">
                <span>Subtotal</span>
                <span>৳ {totalPrice.toFixed(2)}</span>
              </div>
              <div className="mb-2">
                <p className="font-medium mb-1">Shipping</p>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="delivery"
                    value="outside"
                    checked={deliveryArea === "outside"}
                    onChange={() => setDeliveryArea("outside")}
                    className="accent-indigo-600"
                  />
                  Outside Chattogram (৳100)
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="delivery"
                    value="inside"
                    checked={deliveryArea === "inside"}
                    onChange={() => setDeliveryArea("inside")}
                    className="accent-indigo-600"
                  />
                  Inside Chattogram (৳60)
                </label>
              </div>
              <div className="flex justify-between mb-2">
                <p>Shipping Cost</p>
                <p>৳ {DELIVERY_CHARGE.toFixed(2)}</p>
              </div>
              <div className="flex justify-between font-bold text-lg border-t border-slate-300 py-2">
                <p>Total</p>
                <p>৳ {grandTotal.toFixed(2)}</p>
              </div>
            </div>

            <div>
              <h2 className="text-base font-semibold mb-2">Payment Method</h2>
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
              <button
                onClick={handlePlaceOrder}
                disabled={isPlacingOrder}
                className={`mt-4 w-full bg-indigo-600 text-white py-2 rounded-md ${isPlacingOrder ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isPlacingOrder ? (
                  <div className="flex justify-center items-center gap-2">
                    <div className="animate-spin h-5 w-5 border-4 border-t-4 border-white rounded-full"></div>
                    Placing Order...
                  </div>
                ) : (
                  "Place Order"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
