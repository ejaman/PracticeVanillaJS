import { getProductList } from "../apis/api.js";
import ProductList from "../components/ProductList.js";

function ListPage({ $app }) {
  const $page = document.createElement("div");
  $page.className = "ProductListPage";
  $page.innerHTML = `<h1>상품목록</h1>`;

  this.render = () => {
    $app.appendChild($page);
  };

  this.setState = (nextState) => {
    this.state = nextState;
  };

  const fetchProducts = async () => {
    const listData = await getProductList();
    this.setState(listData); // 불러온 상품 목록 저장

    new ProductList({
      $target: $page,
      initialState: this.state,
    });
  };

  // ListPage 생성 시 api 요청해오도록
  fetchProducts();
}

export default ListPage;
