// 注意：live2d_path 参数应使用绝对路径
const live2d_path = "https://github.com/Twig-wanggk/live2d/"// 曾尝试过改成后面的：const live2d_path = "https://fastly.jsdelivr.net/gh/Twig-wanggk/live2d@master/";
const model_path="https://github.com/Twig-wanggk/live2d_api/";//曾尝试过改成后面的：const model_path="https://raw.bgithub.xyz/Twig-wanggk/live2d_api/master/";

// 封装异步加载资源的方法
function loadExternalResource(url, type) {
	return new Promise((resolve, reject) => {
		let tag;

		if (type === "css") {
			tag = document.createElement("link");
			tag.rel = "stylesheet";
			tag.href = url;
		}
		else if (type === "js") {
			tag = document.createElement("script");
			tag.src = url;
		}
		if (tag) {
			tag.onload = () => {
				resolve(url);
			}
			tag.onerror = () => reject(url);
			document.head.appendChild(tag);
		}
	});
}
async function loadScriptsInOrder(){
	if (screen.width >= 768) {//使用宽度判断设备是否适合加载
	await Promise.all([
		loadExternalResource(live2d_path + "pixi.min.js", "js"),
		loadExternalResource(live2d_path + "live2d.min.js", "js"),
		loadExternalResource(live2d_path + "live2dcubismcore.min.js", "js"),
		loadExternalResource("https://libs.baidu.com/jquery/2.0.0/jquery.min.js", "js"),
		loadExternalResource(live2d_path + "waifu.css", "css"),
		loadExternalResource("https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-M/font-awesome/6.0.0/css/all.min.css", "css")
	])
	await loadExternalResource(live2d_path + "index.min.js", "js");
	await loadExternalResource(live2d_path + "waifu-tips.js", "js");
	initWidget({
		waifuPath: model_path + "waifu-tips.json",
		modelListPath: model_path + "model_list.json",
		modelPath:model_path
	});
}}

loadScriptsInOrder();
