import { defineField, defineType } from "sanity";

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

export const user = defineType({
    name: "user",
    type: "document",
    title: "User",
    fields: [
        defineField({ name: "userID", type: "string", title: "User ID" }),
        defineField({ name: "name", type: "string", title: "Full Name" }),
        defineField({ name: "email", type: "string", title: "Email" }),
        defineField({ name: "mobile", type: "string", title: "Mobile" }),

        defineField({
            name: "addresses",
            type: "array",
            title: "Addresses",
            of: [
                {
                    type: "object",
                    name: "address",
                    title: "Address",
                    fields: [
                        defineField({ name: "street", type: "string", title: "Street" }),
                        defineField({ name: "city", type: "string", title: "City" }),
                        defineField({
                            name: "district",
                            type: "string",
                            title: "District",
                            options: {
                                list: bangladeshDistricts.sort().map((district) => ({
                                    title: district,
                                    value: district,
                                })),
                            },
                        }),
                    ],
                },
            ],
        }),
    ],
    preview: {
        select: { title: "userID", subtitle: "email" },
        prepare({ title, subtitle }) {
            return { title, subtitle };
        },
    },
});
