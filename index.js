const $ = id => document.getElementById(id);
const SAFE_ID = /^[a-z0-9_-]+$/i;

document.title = SITE.name + "｜作品一覽";
$("name").textContent = SITE.name;
$("tagline").textContent = SITE.tagline;
$("license").textContent = SITE.license;

function placeholder(label){
  const s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  s.setAttribute("viewBox", "0 0 600 800");
  s.setAttribute("role", "img");
  s.setAttribute("aria-label", label);
  s.innerHTML =
    '<rect class="ph-bg" width="600" height="800"/>' +
    '<rect class="ph-line" x="40" y="40" width="520" height="720"/>' +
    '<text class="ph-t" x="300" y="410" text-anchor="middle">封面</text>';
  return s;
}

const list = WORKS.filter(w => SAFE_ID.test(w.id));
if (!list.length){
  const p = document.createElement("p");
  p.className = "empty";
  p.textContent = "還沒有作品。請在 works.js 新增一筆。";
  $("grid").replaceWith(p);
}
list.forEach(w => {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.className = "card";
  a.href = "reader.html?w=" + encodeURIComponent(w.id);

  const cover = document.createElement("div");
  cover.className = "cover";
  if (w.demo) cover.appendChild(placeholder(w.title + " 的封面"));
  else {
    const im = new Image();
    im.src = "works/" + w.id + "/cover." + w.ext;
    im.alt = w.title + " 的封面";
    im.loading = "lazy";
    cover.appendChild(im);
  }

  const h = document.createElement("h2");
  h.textContent = w.title;
  const p = document.createElement("p");
  p.textContent = w.blurb || "";

  a.append(cover, h, p);
  li.appendChild(a);
  $("grid").appendChild(li);
});
