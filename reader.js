const $ = id => document.getElementById(id);
const SAFE_ID = /^[a-z0-9_-]+$/i;

$("license").textContent = SITE.license;

// 只接受 works.js 裡登記過的作品，避免網址被亂填
const wid = new URLSearchParams(location.search).get("w") || "";
const work = SAFE_ID.test(wid) ? WORKS.find(w => w.id === wid) : null;

function message(text){
  const p = document.createElement("p");
  p.className = "note";
  p.textContent = text;
  $("stage").replaceChildren(p);
}

if (!work){
  document.title = "找不到作品";
  $("title").textContent = "找不到作品";
  $("left").disabled = $("right").disabled = $("dir").disabled = true;
  message("這個網址沒有對應的作品，請回到作品一覽。");
} else {
  document.title = work.title;
  $("title").textContent = work.title;

  const n = work.pages;
  let i = 0, rtl = !!work.rtl;

  const src = k => "works/" + work.id + "/pages/" + String(k + 1).padStart(3, "0") + "." + work.ext;

  function placeholder(k){
    const s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    s.setAttribute("viewBox", "0 0 600 850");
    s.setAttribute("role", "img");
    s.setAttribute("aria-label", "示意頁 " + (k + 1));
    s.innerHTML =
      '<rect class="ph-bg" width="600" height="850"/>' +
      '<rect class="ph-line" x="40" y="40" width="520" height="360"/>' +
      '<rect class="ph-line" x="40" y="430" width="250" height="380"/>' +
      '<rect class="ph-line" x="320" y="430" width="240" height="380"/>' +
      '<text class="ph-t" x="300" y="235" text-anchor="middle">示意頁 ' + (k + 1) + '</text>';
    return s;
  }

  function render(){
    const st = $("stage");
    st.replaceChildren();
    if (work.demo) st.appendChild(placeholder(i));
    else {
      const im = new Image();
      im.alt = work.title + " 第 " + (i + 1) + " 頁";
      im.decoding = "async";
      im.draggable = false;
      im.onerror = () => message("第 " + (i + 1) + " 頁讀取失敗，請確認檔案 " + src(i) + " 是否存在。");
      im.src = src(i);
      st.appendChild(im);
      if (i < n - 1) new Image().src = src(i + 1); // 預先載入下一頁
    }
    $("count").textContent = (i + 1) + " / " + n;
    // 左右按鈕：由右至左時，右邊是「上一頁」
    $("left").disabled  = rtl ? i === n - 1 : i === 0;
    $("right").disabled = rtl ? i === 0 : i === n - 1;
    $("left").setAttribute("aria-label",  rtl ? "下一頁" : "上一頁");
    $("right").setAttribute("aria-label", rtl ? "上一頁" : "下一頁");
    $("dir").textContent = "閱讀方向：" + (rtl ? "由右至左" : "由左至右");
    $("dir").setAttribute("aria-pressed", rtl);
  }

  const go = d => { i = Math.min(n - 1, Math.max(0, i + d)); render(); };
  const toLeft  = () => go(rtl ? 1 : -1);
  const toRight = () => go(rtl ? -1 : 1);

  $("left").onclick = toLeft;
  $("right").onclick = toRight;
  $("dir").onclick = () => { rtl = !rtl; render(); };
  document.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") toLeft();
    if (e.key === "ArrowRight") toRight();
  });

  let x0 = null;
  $("stage").addEventListener("touchstart", e => { x0 = e.touches[0].clientX; }, { passive: true });
  $("stage").addEventListener("touchend", e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    x0 = null;
    if (Math.abs(dx) > 50) (dx > 0 ? toLeft() : toRight());
  });

  render();
}
