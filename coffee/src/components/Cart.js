import { routeChange } from "../router.js";
import { removeItem } from "../storage.js";

function Cart({ $target, initialState }) {
  const $component = document.createElement("div");
  $component.className = "Cart";
  this.state = initialState;

  $target.appendChild($component);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.getTotalPrice = () => {
    return this.state.reduce((acc, option) => acc + (option.productPrice + option.optionPrice) * option.quantity, 0);
  };

  this.render = () => {
    $component.innerHTML = `<ul>
    ${this.state
      .map(
        (item) => `
      <li class="Cart__item">
      <img
        src="${item.imageUrl}"
      />
      <div class="Cart__itemDesription">
      <div>${item.productName} ${item.productName} ${item.quantity}</div>
        <div>${item.productPrice + item.optionPrice}</div>
      </div>
    </li>`
      )
      .join("")}
    </ul>
    <div class="Cart__totalPrice">총 상품가격 ${this.getTotalPrice()}</div>
    <button class="OrderButton">주문하기</button>`;

    return $component;
  };

  $component.addEventListener("click", (event) => {
    if (event.target.className === "OrderButton") {
      alert("주문 되었습니다!");
      removeItem("products_cart");
      routeChange("/coffee/index.html");
    }
  });

  this.render();
}

export default Cart;
