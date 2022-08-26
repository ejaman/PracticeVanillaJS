import SelectedOptions from "./SelectedOptions.js";

function ProductDetail({ $target, initialState }) {
  const $product = document.createElement("div");
  $product.className = "ProductDetail";

  $target.appendChild($product);

  // initialState: {
  //   product: this.state.product,
  //   selectedOptions: [],
  // }
  this.state = initialState;

  // fetchProduct 이후 화면이 렌더링 되었을 때 동작할 수 있도록 let으로 생성
  let selectedOptions = null;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();

    if (selectedOptions) {
      selectedOptions.setState({
        product: this.state.product,
        selectedOptions: this.state.selectedOptions,
      });
    }
  };

  this.render = () => {
    const { product } = this.state;

    const detail = `<img
          src="${product.imageUrl}"
        />
        <div class="ProductDetail__info">
          <h2>${product.name}</h2>
          <div class="ProductDetail__price">${product.price}원~</div>
          <select>
            <option>선택하세요.</option>
            ${product.productOptions
              .map(
                (opt) =>
                  `<option value="${opt.id}" ${opt.stock === 0 ? "disabled" : ""}>${opt.stock === 0 ? "(품절)" : ""} ${
                    opt.name
                  } ${opt.price > 0 ? `(+ ${opt.price}원 )` : ""}</option>`
              )
              .join()}
          </select>
          <div class="ProductDetail__selectedOptions">
          </div>
        </div>`;
    $product.innerHTML = detail;

    selectedOptions = new SelectedOptions({
      $target: $product.querySelector(".ProductDetail__selectedOptions"),
      initialState: { product: this.state.product, selectedOptions: this.state.selectedOptions },
    });
  };

  this.render();

  $product.addEventListener("change", (event) => {
    if (event.target.tagName === "SELECT") {
      // 상품 옵션을 나타내는 option의 value의 optionId를 가저와 변경
      const selectedOptionId = parseInt(event.target.value);
      const { product, selectedOptions } = this.state;

      // 상품 옵션 데이터에서 현재 선택한 optionId가 존재하는지 찾기
      const option = product.productOptions.find((option) => option.id === selectedOptionId);

      //이미 선택한 상품인지 선택된 상품 데이터에서 찾기
      const seletedOption = selectedOptions.find((selectedOption) => selectedOption.id === selectedOptionId);

      // 존재하는 옵션이고 선택된 옵션이 아닌 경우에만 selectedOptions에 현재 선택한 옵션을 추가
      if (option && !seletedOption) {
        const nextSeletedOptions = [
          ...selectedOptions,
          {
            productId: product.id,
            optionId: option.id,
            optionName: option.name,
            optionPrice: option.price,
            quantity: 1,
          },
        ];
        this.setState({
          ...this.state,
          selectedOptions: nextSeletedOptions,
        });
      }
    }
  });
}

export default ProductDetail;
