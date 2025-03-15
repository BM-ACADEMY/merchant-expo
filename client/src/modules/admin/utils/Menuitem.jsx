const menuItems = [
    { title: "Dashboard", icon: "Gauge", link: "/admin/dashboard" },
    { title: "Profile", icon: "User", link: "/admin/profile" },

    {
        title: "End Users",
        icon: "UsersThree",
        children: [
            {
                title: "Merchant",
                icon: "Storefront",
                children: [
                    { title: "Merchant List", icon: "List", link: "/admin/merchants" },
                    { title: "Merchant Product List", icon: "ShoppingCart", link: "/admin/merchants/products" }
                ]
            },
            {
                title: "Service Provider",
                icon: "GearSix",
                children: [
                    { title: "Service Provider List", icon: "List", link: "/admin/service-providers" },
                    { title: "Vehicle List", icon: "Car", link: "/admin/service-providers/vehicles" }
                ]
            },
            {
                title: "Grocery Seller",
                icon: "ShoppingBag",
                children: [{ title: "Grocery Seller List", icon: "List", link: "/admin/grocery-sellers" }]
            },
            {
                title: "Students",
                icon: "GraduationCap",
                children: [{ title: "Student List", icon: "List", link: "/admin/students" }]
            },
            {
                title: "Common Users",
                icon: "UsersThree",
                children: [{ title: "Users List", icon: "List", link: "/admin/common-users" }]
            }
        ]
    },

    {
        title: "Payments",
        icon: "CreditCard",
        children: [
            { title: "Paid Subscriptions", icon: "CurrencyDollar", link: "/admin/payments/subscriptions" },
            { title: "Paid E-Book", icon: "Book", link: "/admin/payments/ebooks" },
            { title: "Paid Banners", icon: "Image", link: "/admin/payments/banners" },
            { title: "Redeem Coupons", icon: "Ticket", link: "/admin/payments/coupons" }
        ]
    },

    {
        title: "Plans",
        icon: "Notepad",
        children: [
            { title: "Subscriptions", icon: "Calendar", link: "/admin/plans/subscriptions" },
            { title: "Banner", icon: "Flag", link: "/admin/plans/banners" },
            { title: "E-Book", icon: "BookOpen", link: "/admin/plans/ebooks" }
        ]
    },

    {
        title: "Categories",
        icon: "SquaresFour",
        children: [
            { title: "Main Categories", icon: "Folder", link: "/admin/categories/main" },
            { title: "Sub Categories", icon: "FolderSimple", link: "/admin/categories/sub" },
            { title: "Super Sub Categories", icon: "Stack", link: "/admin/categories/super-sub" },
            { title: "Deep Sub Categories", icon: "ArchiveBox", link: "/admin/categories/deep-sub" },
            { title: "Products", icon: "Package", link: "/admin/categories/products" }
        ]
    },

    {
        title: "Others",
        icon: "DotsThreeCircle",
        children: [
            { title: "Post By Requirement", icon: "NotePencil", link: "/admin/others/post-requirement" },
            { title: "Buyer & Seller FAQ", icon: "Question", link: "/admin/others/faq" },
            { title: "Complaint", icon: "Warning", link: "/admin/others/complaint" },
            { title: "Testimonial", icon: "ChatText", link: "/admin/others/testimonial" }
        ]
    }
];

export default menuItems;
