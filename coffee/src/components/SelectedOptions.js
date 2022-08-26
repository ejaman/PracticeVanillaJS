import { routeChange } from "../router.js";
import { getItem, setItem } from "../storage.js";

function SelectedOptions({ $target, initialState }) {
  const $component = document.createElement("div");
  $target.appendChild($component);

  // initialState: { product: this.state.product, selectedOptions: this.state.selectedOptions }
  this.state = initialState;

  // 상품 가격의 총합 구하기
  this.getTotalPrice = () => {
    const { product, selectedOptions } = this.state;
    const { price: productPrice } = product;

    return selectedOptions.reduce((acc, option) => acc + (productPrice + option.optionPrice) * option.quantity, 0); //
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { product, selectedOptions = [] } = this.state;

    if (product && selectedOptions) {
      const selected = `
      <h3>선택된 상품</h3>
      <ul>
        ${selectedOptions
          .map(
            (option) => `
      <li>
          ${option.optionName} ${product.price + option.optionPrice}원
        <div><input type="text" data-optionId="${option.optionId}" value="${option.quantity}"/>개</div>
      </li>`
          )
          .join("")}
      </ul>
      <div class="ProductDetail__totalPrice">${this.getTotalPrice()}원</div>
      <button class="OrderButton">주문하기</button>`;
      $component.innerHTML = selected;
    }
  };

  this.render();

  $component.addEventListener("change", (event) => {
    if (event.target.tagName === "INPUT") {
      try {
        const nextQuantity = parseInt(event.target.value);
        const nextSelectedOptions = [...this.state.selectedOptions];
        // input 값이 숫자인 경우만 처리
        if (typeof nextQuantity === "number") {
          const { product } = this.state;

          const optionId = parseInt(event.target.dataset.optionid);
          const option = product.productOptions.find((opt) => opt.id === optionId);
          const selectedOptionIndex = nextSelectedOptions.findIndex(
            (selectedOption) => selectedOption.optionId === optionId
          );
          // input에 입력한 값이 재고수량을 넘을 경우 재고 수량으로 입력한 것 바꾸기
          nextSelectedOptions[selectedOptionIndex].quantity = option.stock > nextQuantity ? nextQuantity : option.stock;

          this.setState({
            ...this.state,
            selectedOptions: nextSelectedOptions,
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  });

  $component.addEventListener("click", (event) => {
    const { selectedOptions } = this.state;
    if (event.target.className === "OrderButton") {
      // 주문하기 버튼을 누르면
      // 먼저 기존에 담겨진 장바구니 데이터가 있을 수 있으므로 가져와본다 -> 없으면 빈배열
      const cartData = getItem("products_cart", []);

      // 장바구니 데이터 만들기
      setItem(
        "products_cart",
        cartData.concat(
          selectedOptions.map((opt) => ({
            productId: opt.productId,
            optionId: opt.optionId,
            quantity: opt.quantity,
          }))
        )
      );
      routeChange("/coffee/cart");
    }
  });
}
export default SelectedOptions;
