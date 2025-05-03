import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ProductApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    // GET Products (with pagination and search)
    getProducts: builder.query({
      query: ({ page = 1, limit = 10, filter = "", search = "" }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          search,
          filter,
        });
    
        return `/products/fetch-all-products?${params.toString()}`;
      },
      transformResponse: (response) => response,
      providesTags: ["Product"],
    }),
    
    // POST Create Product
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/products/create-products",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    // PUT Update Product
    updateProduct: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/products/update-products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    // DELETE Product
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/delete-products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    // ✅ GET Merchant by email or phone
    getMerchantByEmailOrPhone: builder.query({
      query: (email) => `/users/fetch-user-by-email-or-phone?email=${email}`,
      providesTags: ["Product"],
    }),
    // category api
    getCategories: builder.query({
      query: () => "/categories/fetch-all-category-for-super-sub-category",
   
      providesTags: ["Product"],
    }),
    // sub cateogry api
    getSubCategories: builder.query({
      query: (categoryId) =>
        `/sub-categories/fetch-all-sub-category-for-super-sub-category?category=${categoryId}`,
   
      providesTags: ["Product"],
    }),
    // super sub category
    getSuperSubCategories: builder.query({
      query: (subCategoryId) =>
        `/super-sub-categories/fetch-all-super-sub-category-deep-sub-category?subCategory=${subCategoryId}`,
  
      providesTags: ["Product"],
    }),

    // deep sub category
    getDeepSubCategories: builder.query({
      query: (superSubCategoryId) =>
        `/deep-sub-categories/fetch-all-deep-sub-category-for-product?superSubCategory=${superSubCategoryId}`,

      providesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetMerchantByEmailOrPhoneQuery,
  useLazyGetMerchantByEmailOrPhoneQuery,
  useGetCategoriesQuery,
  useGetSubCategoriesQuery,
  useGetSuperSubCategoriesQuery,
  useGetDeepSubCategoriesQuery,
} = ProductApi;
