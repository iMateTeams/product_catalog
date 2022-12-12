import { Product } from '../../types/Product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { update } from '../../api/products';

export interface ProductsState {
  items: Product[];
  dataLength: number;
  itemsInCart: Product[];
  itemsLiked: Product[];
  totalCartPrice: number;
  loadingMainData: boolean;
  loadingCartData: boolean;
  loadingLikedData: boolean;
  error: string | null;
  newModels: Product[];
  hotPrices: Product[];
}

const initialState: ProductsState = {
  items: [],
  dataLength: 0,
  itemsInCart: [],
  itemsLiked: [],
  totalCartPrice: 0,
  loadingMainData: false,
  error: null,
  newModels: [],
  hotPrices: [],
  loadingCartData: false,
  loadingLikedData: false,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getProductsStart(state) {
      state.loadingMainData = true;
    },

    getProductsSuccess(state, action: PayloadAction<ProductsState>) {
      state.items = action.payload.items;
      state.dataLength = action.payload.dataLength;
      state.itemsInCart = action.payload.itemsInCart;
      state.itemsLiked = action.payload.itemsLiked;
      state.loadingMainData = false;
      state.error = null;
    },

    getProductsFailure(state, action: PayloadAction<string>) {
      state.loadingMainData = false;
      state.error = action.payload;
    },

    updateProductSuccess(state, action: PayloadAction<Product>) {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      state.items[index] = action.payload;

      console.log('cartLengthBeforeUpdate', state.itemsInCart.length);

      if (action.payload.inCart) {
        state.itemsInCart.push(action.payload);
      } else {
        state.itemsInCart = state.itemsInCart.filter((item) => +item.id !== +action.payload.id);
      }

      if (action.payload.liked) {
        state.itemsLiked.push(action.payload);
      } else {
        state.itemsLiked = state.itemsLiked.filter((item) => +item.id !== +action.payload.id);
      }

      const indexNewModels = state.newModels.findIndex((item) => item.id === action.payload.id);

      if (indexNewModels !== -1) {
        state.newModels[indexNewModels] = action.payload;
      }

      const indexHotPrices = state.hotPrices.findIndex((item) => item.id === action.payload.id);

      if (indexHotPrices !== -1) {
        state.hotPrices[indexHotPrices] = action.payload;
      }

      console.log('cartLengthBeforeUpdate', state.itemsInCart.length);
    },

    updateProductFailure(state, action: PayloadAction<string>) {
      state.loadingMainData = false;
      state.error = action.payload;
    },

    updateTotalCartPrice(state) {
      state.totalCartPrice = state.itemsInCart.reduce(
        (acc, product) => acc + product.price,
        0
      );
    },

    clearCart(state) {
      state.itemsInCart = [];
      state.totalCartPrice = 0;
    },

    handleUpdateProductCard(state, action: PayloadAction<Product>) {
      const { id } = action.payload;
  
      try {
        update(+id, action.payload);
      } catch (error) {
        console.log(error);
      }
    },

    setHotPrices(state, action: PayloadAction<Product[]>) {
      state.hotPrices = action.payload;
    },

    setNewModels(state, action: PayloadAction<Product[]>) {
      state.newModels = action.payload;
    },
  },
});

export const {
  getProductsStart,
  getProductsSuccess,
  getProductsFailure,
  updateProductSuccess,
  updateProductFailure,
  updateTotalCartPrice,
  clearCart,
  setHotPrices,
  setNewModels,
  handleUpdateProductCard
} = productsSlice.actions;

export default productsSlice.reducer;