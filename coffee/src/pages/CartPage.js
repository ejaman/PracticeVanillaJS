import { getIdProduct } from "../apis/api.js";
import Cart from "../components/Cart.js";
import { routeChange } from "../router.js";
import { getItem } from "../storage.js";

function CartPage({ $app }) {
  const $page = document.createElement("div");
  $page.className = "CartPage";
  $page.innerHTML = `<h1>장바구니</h1>`;

  const cartData = getItem("products_cart", []);

  let cartComponent = null;

  this.render = () => {
    if (cartData.length === 0) {
      alert("장바구니가 비었습니다.");
      routeChange("/coffee/index.html");
    } else {
      $app.appendChild($page);
      // Cart 컴포넌트 생성
      if (this.state.products && !cartComponent) {
        cartComponent = new Cart({
          $target: $page,
          initialState: this.state.products,
        });
      }
    }
  };

  this.state = {
    products: null,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.fetchProducts = async () => {
    const products = await Promise.all(
      cartData.map(async (item) => {
        const product = await getIdProduct(item.productId);
        const selectedOption = product.productOptions.find((option) => option.id === item.optionId);

        return {
          imageUrl: product.imageUrl,
          productName: product.name,
          quantity: item.quantity,
          productPrice: product.price,
          optionName: selectedOption.name,
          optionPrice: selectedOption.price,
        };
      })
    );
    this.setState({ products });
  };

  this.fetchProducts();
}
export default CartPage;
