import { routeChange } from "../router.js";

function ProductList({ $target, initialState }) {
  const $productList = document.createElement("ul");
  $target.appendChild($productList);

  this.state = initialState;

  // this.setState = (nextState) => {
  //   this.state = nextState;
  //   this.render();
  // };

  this.render = () => {
    if (!this.state) {
      return;
    }

    // data-product-id: custom attribute
    const list = this.state
      .map(
        (item) => `<li class="Product" data-product-id="${item.id}">
      <img src="${item.imageUrl}">
      <div class="Product__info">
        <div>${item.name}</div>
        <div>${item.price}~</div>
      </div>
    </li>`
      )
      .join(``);

    $productList.innerHTML = list;
  };

  this.render();

  $productList.addEventListener("click", (event) => {
    const $li = event.target.closest("li");
    const { productId } = $li.dataset;

    if (productId) {
      routeChange(`/products/${productId}`);
    }
  });
}

export default ProductList;
