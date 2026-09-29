/* ===== 新增作品時，只需要改這個檔案 =====
 *
 * 1. 在 works/ 底下建一個資料夾，名稱用英數字與連字號（例如 my-comic）
 * 2. 放入：
 *      works/my-comic/cover.webp        封面
 *      works/my-comic/pages/001.webp    第 1 頁
 *      works/my-comic/pages/002.webp    第 2 頁 ……（三位數字，依序）
 * 3. 在下面的 WORKS 最上面加一筆（新作品放最前面）
 * 4. 把範例作品（demo: true 那筆）刪掉
 */

const SITE = {
  name: "筆名",
  tagline: "一句話介紹。作品免費公開閱讀。",
  license: "授權：請填寫，例如「僅供個人閱讀，禁止轉載與商用」。"
};

const WORKS = [
  {
    id: "sample",          // 資料夾名稱
    title: "作品標題",
    blurb: "一兩句作品介紹。",
    pages: 6,              // 總頁數
    ext: "webp",           // 圖檔副檔名：webp / jpg / png
    rtl: false,            // true = 預設由右至左（日式漫畫）
    demo: true             // 示意用，正式作品請刪除這一行
  }
];
