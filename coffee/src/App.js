import CartPage from "./pages/CartPage.js";
import DetailPage from "./pages/DetailPage.js";
import ListPage from "./pages/ListPage.js";
import { init } from "./router.js";

function App({ $app }) {
  this.route = () => {
    const { pathname } = location;

    $app.innerHTML = "";

    if (pathname === "/coffee/index.html") {
      new ListPage({ $app }).render();
    } else if (pathname.includes("/products/")) {
      const [, , productId] = pathname.split("/");

      new DetailPage({ $app, productId }).render();
    } else if (pathname === "/coffee/cart") {
      console.log(pathname);
      new CartPage({ $app }).render();
    }
  };

  // ROUTE_CHANGE 이벤트 발생 시 App의 this.route함수가 호출되게 하는 효과
  init(this.route);
  this.route();

  // 뒤로가기, 앞으로 가기 발생 시 popstate 이벤트 발생
  window.addEventListener("popstate", this.route);
}

export default App;
