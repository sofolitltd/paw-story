'use client'
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

export default function CheckoutPage() {
  const { cart, totalPrice } = useCart();
  const DELIVERY_CHARGE = 5.99;
  const grandTotal = totalPrice + DELIVERY_CHARGE;
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    street: "",
    district: "",
    notes: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cash");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  // 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    // Check for required fields
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.mobile ||
      !formData.email ||
      !formData.street ||
      !formData.district
    ) {
      alert("Please fill in all required fields.");
      return;
    }
  
    // Generate Order Number
    const orderNo = `ORD-${Math.floor(Math.random() * 1000000)}`;
  
    // Generate Order Time (current date & time)
    const orderTime = new Date().toLocaleString(); // Localized date and time string
  
    // Stringify the cart and pass it in the URL query
    const cartStringified = JSON.stringify(cart);
  
    // Prepare the URL with query params
    const queryParams = new URLSearchParams({
      firstName: formData.firstName,
      lastName: formData.lastName,
      mobile: formData.mobile,
      email: formData.email,
      street: formData.street,
      district: formData.district,
      notes: formData.notes,
      cart: cartStringified,  // Pass the stringified cart
      totalPrice: totalPrice.toFixed(2),
      grandTotal: grandTotal.toFixed(2),
      paymentMethod: paymentMethod,
      orderNo: orderNo,        // Add the generated order number
      orderTime: orderTime     // Add the generated order time
    }).toString();
  
    // Navigate to the confirmation page with query parameters
    router.push(`/order-confirmation?${queryParams}`);
    
  };
  
  

  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty. Go back to shop.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: User Information */}
          <div className="bg-white shadow-md border rounded-md p-6 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Billing Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <input
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
              <input
                type="text"
                name="street"
                placeholder="Street Address"
                value={formData.street}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
              {/* District Dropdown with Search */}
              <select
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
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
              <textarea
                name="notes"
                placeholder="Order Notes (Optional)"
                value={formData.notes}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                rows={3}
              />
            </form>
          </div>

          {/* Right: Order Summary & Payment */}
          <div>
            <div className="bg-white shadow-md border rounded-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Your Order</h2>
              {cart.map((item) => (
                <div key={item.slug} className="border-t py-1 flex items-center gap-2">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={40}
                    height={40}
                    className="rounded-md"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{item.title}</p>
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
              <div className="flex justify-between border-t py-2 mt-4">
                <p>Subtotal</p>
                <p>৳ {totalPrice.toFixed(2)}</p>
              </div>
              <div className="flex justify-between border-t py-2">
                <p>Shipping</p>
                <p>৳ {DELIVERY_CHARGE.toFixed(2)}</p>
              </div>
              <div className="flex justify-between font-bold text-lg border-t py-2">
                <p>Total</p>
                <p>৳ {grandTotal.toFixed(2)}</p>
              </div>
            </div>
            <div className="bg-white shadow-md border rounded-md p-6">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
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
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bkash"
                    checked={paymentMethod === "bkash"}
                    onChange={() => setPaymentMethod("bkash")}
                  />
                  bKash
                </label>
              </div>
              <div className="mt-4">
                <hr className="my-2" />
                <button
                  onClick={handleSubmit}
                  className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
