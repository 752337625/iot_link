export const zoomHtml: string = `
<style>
  .fabric-zoom-parent-div {
    border: 1px solid #ccc;
    position: absolute;
    bottom: 10px;
    left: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .fabric-zoom-parent-div-btn {
    height: 30px;
    background-color: #fff;
    cursor: pointer;
    padding: 0 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 1px;
  }
  .fabric-zoom-parent-div-input {
    outline: none;
    width: 60px;
    height: 30px;
    border: none;
    background-color: #fff;
    cursor: pointer;
    padding: 0 5px;
    text-align: center;
    color: #000;
  }
</style>
    <div class="fabric-zoom-parent-div">
      <span
        class="fabric-zoom-parent-div-btn"
        style="border-right: 1px solid #ccc"
        id="fabric-zoom-in"
      >
        <svg
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
        >
          <path
            d="M467.549091 84.014545a383.534545 383.534545 0 0 1 290.257454 634.27491l173.98691 173.893818a28.020364 28.020364 0 1 1-39.563637 39.610182l-173.940363-173.98691a383.534545 383.534545 0 1 1-250.740364-673.838545z m0 55.994182a327.540364 327.540364 0 1 0 228.584727 562.176l2.746182-3.304727a28.206545 28.206545 0 0 1 3.258182-2.792727 327.540364 327.540364 0 0 0-234.589091-556.078546z m-0.837818 176.733091c13.824 0 24.994909 11.170909 24.994909 24.994909V441.716364h100.026182a24.994909 24.994909 0 0 1 0 49.989818h-100.072728l0.046546 100.026182a24.994909 24.994909 0 1 1-49.989818 0v-100.072728l-99.979637 0.046546a24.994909 24.994909 0 1 1 0-49.989818H441.716364V341.736727c0-13.824 11.170909-24.994909 24.994909-24.994909z"
            id="fabric-zoom-in-svg"></path>
        </svg>
      </span>
      <input
        type="text"
        id="fabric-zoom-input"
        value="100%"
        class="fabric-zoom-parent-div-input"
        readonly
      />
      <span
        class="fabric-zoom-parent-div-btn"
        style="border-left: 1px solid #ccc"
        id="fabric-zoom-out"
      >
        <svg
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
        >
          <path
            d="M467.549091 84.014545a383.534545 383.534545 0 0 1 290.257454 634.27491l173.98691 173.893818a28.020364 28.020364 0 1 1-39.563637 39.610182l-173.940363-173.98691a383.534545 383.534545 0 1 1-250.740364-673.838545z m0 55.994182a327.540364 327.540364 0 1 0 228.584727 562.176l2.746182-3.304727a28.206545 28.206545 0 0 1 3.258182-2.792727 327.540364 327.540364 0 0 0-234.589091-556.078546z m124.183273 301.707637a24.994909 24.994909 0 0 1 0 49.989818H341.736727a24.994909 24.994909 0 1 1 0-49.989818h249.949091z"
            id="fabric-zoom-out-svg"
          ></path>
        </svg>
      </span>
    </div>
`;
