import { getIdProduct } from "../apis/api.js";
import ProductDetail from "../components/ProductDetail.js";

function DetailPage({ $app, productId }) {
  const $page = document.createElement("div");
  $page.className = "ProductDetailPage";
  $page.innerHTML = `<h1>상품 정보</h1>`;

  this.state = { productId, product: null };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (!this.state.product) {
      $app.innerHTML = "Loading";
    } else {
      $app.innerHTML = "";
      $app.appendChild($page);

      new ProductDetail({
        $target: $page,
        initialState: {
          product: this.state.product,

          // ProductDetail의 initialState에 선택된 상품들을 담아둘 곳
          selectedOptions: [],
        },
      });
    }
  };

  this.fetchProduct = async () => {
    const { productId } = this.state;
    const product = await getIdProduct(productId);

    this.setState({
      ...this.state,
      product,
    });
  };

  this.fetchProduct();
}
export default DetailPage;
