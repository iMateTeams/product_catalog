import { Product } from '../../types/Product';
import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunkAction } from '../../app/store';
import { getNewest } from '../../api/products';
import { getPart, update } from '../../api/products';
import { useAppDispatch } from '../../app/hooks';

export interface ProductsState {
  items: Product[];
  dataLength: number;
  itemsInCart: Product[];
  itemsLiked: Product[];
  totalCartPrice: number;
  loading: boolean;
  error: string | null;
  newModels: Product[];
}

const initialState: ProductsState = {
  items: [],
  dataLength: 0,
  itemsInCart: [],
  itemsLiked: [],
  totalCartPrice: 0,
  loading: false,
  error: null,
  newModels: [],
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getProductsStart(state) {
      state.loading = true;
    },
    getProductsSuccess(state, action: PayloadAction<ProductsState>) {
      state.items = action.payload.items;
      state.dataLength = action.payload.dataLength;
      state.itemsInCart = action.payload.itemsInCart;
      state.itemsLiked = action.payload.itemsLiked;
      state.loading = false;
      state.error = null;
    },
    getProductsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateProductStart(state) {
      state.loading = true;
    },
    updateProductSuccess(state, action: PayloadAction<Product>) {
      const { id, inCart, liked } = action.payload;
      const existingProduct = state.items.find((product) => product.id === id);
      if (existingProduct) {
        existingProduct.inCart = inCart;
        existingProduct.liked = liked;
      }
      state.loading = false;
      state.error = null;

      getNewest().then((res) => {
        state.newModels = res.data;
      }
      );
    },
    updateProductFailure(state, action: PayloadAction<string>) {
      state.loading = false;
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
    removeFromCart(state, action: PayloadAction<Product>) {
      const { id } = action.payload;
      state.itemsInCart = state.itemsInCart.filter((product) => product.id !== id);
      state.totalCartPrice = state.itemsInCart.reduce(
        (acc, product) => acc + product.price,
        0
      );
    },
    getNewModels(state, action: PayloadAction<Product[]>) {
      state.newModels = action.payload;
    },
    handleAddToCart(state, action: PayloadAction<Product>) {
      const { id } = action.payload;
      const existingProduct = state.items.find((product) => product.id === id);
      if (existingProduct) {
        updateProductStart();

        if (existingProduct.inCart) {
          update(+id, { inCart: false}).then((res) => {
            updateProductSuccess(res.data);
          });
        } else {
          update(+id, { inCart: true}).then((res) => {
            updateProductSuccess(res.data);
          });
        }

        state.itemsInCart = [...state.itemsInCart, existingProduct];
        state.totalCartPrice = state.itemsInCart.reduce(
          (acc, product) => acc + product.price,
          0
        );
      }
    }
  },
});

export const {
  getProductsStart,
  getProductsSuccess,
  getProductsFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  updateTotalCartPrice,
  clearCart,
  removeFromCart,
  getNewModels,
  handleAddToCart,
} = productsSlice.actions;

export default productsSlice.reducer;