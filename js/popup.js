$(function() {

	// 加载设置
	var defaultConfig = {color: 'white'}; // 默认配置
	chrome.storage.sync.get(defaultConfig, function(items) {
		document.body.style.backgroundColor = items.color;
	});

	// 初始化国际化
	$('#test_i18n').html(chrome.i18n.getMessage("helloWorld"));


});
var tabToUrl = {};
// 打开后台页
$('#get_all_cookies').click(e => {
	chrome.cookies.getAll({url:'https://wqs.jd.com'}, (cookies) => {
		const dl =['pt_key','pt_pin','pt_token']
		let cl = []
		if (cookies) {
			// let testPtPin = cookies.findIndex(v=>v.name === 'pt_pin' && /^jd_(\S+)$/.test(v.value));
			// if(testPtPin !== -1){
			// 	alert('此账号未通过实名认证，须实名并绑卡')
			// 	return
			// }
			dl.map(v=>{
				cookies.find(d=>{
					if(d.name === v){
						cl.push(`${d.name}=${d.value};`)
					}
				})
			})
			if(cl.join("") !== ""){
				copyInfo(cl.join(""))
			}else{
				alert('cookie为空,请先登录')
			}
		}
	})
});
// 清除cookies
$('#clear_cookies').click(e => {
	chrome.cookies.getAll({domain: 'jd.com'}, function(cookies) {
		for(var i=0; i < cookies.length; i++) {
			chrome.cookies.remove({url: "https://" + cookies[i].domain  + cookies[i].path, name: cookies[i].name});
			lastDelCookie = "https://" + cookies[i].domain  + cookies[i].path;
		}
	});
	chrome.tabs.reload();
});

function copyInfo(val) {
	document.addEventListener('copy', save); // 监听浏览器copy事件  在文档中添加点击事件
	document.execCommand('copy'); // 执行copy事件，这时监听函数会执行save函数。 拷贝当前选中内容到剪贴板
	document.removeEventListener('copy', save); // 移除copy事件
	function save(e) {
		e.clipboardData.setData('text/plain', val); // 剪贴板内容设置 windows子对象clipboardData的一个方法  ('复制格式',复制内容)
		e.preventDefault();
	}
	alert(`cookie已复制: ${val}`)
}