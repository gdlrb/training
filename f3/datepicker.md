дом объективная модель документа
нода - узел
элемент
типы узлов, 12шт всего
документы, элементы, текст, комментарии
document.body.firstElementChild - для работы с элементами
айдишки видны из глобального элемента window
matches - поиск цсс селекторов и вывод true/false
обработка событий
события, делегаты
ожидание функций
события с мышкой mouseover, mousmove, click
опрокидывание события fireevent
submit, blur, change
befounload
обработка событий css
onclick - работает в глобальной видимости window
addeventlistener - три параметра ("click, function(){}")
removeventlistener - отписаться от функции, не повторяет выполнение
function functn(event) {
	debugger;

	console.log(event);

}
eventtype - click, change
event.currenttarget
event.target
всплытие
target - возвращает клик по самому элементу, p. input
currentTarget - элемент в который вложен элемент клика
погружение addeventlistener - третий параметр true, false - есть погружение или нет
по умолчанию всплытие

stoppropoganation - прерывает всплытие, не рекомендуется делать
var isvisible = false;
dropdounbutton.eventlistener("click", function() {
	list.style.display = !invisible ? ""  : "none";
	isvisible = !isvisible;

	event.stoppropoganation();
});
window.eventlistener("click", function() {
	list.style.display = "none";
	isvisible = false;
});

event.preventdefoult - прерывает дефолтные события

делегирование
вешать ивент на общий блок
на курент таргет обработчик
if target.tagname = "td";

драг и дроп, события с мышкой
притягивание элементов к другим

js style guide
общие правила написания кода js
google style guide
jhon papa guide angular

[].forEache.call(document.body.children, function(elem, index) {
	console.log(elem);
});
var childrens = Array.prototype.slice.call(document.body.children);

///////////////
разбитие на модули вызова и выполнение, отдельное создание календаря в одном селекторе
функциональный способ

ооп способ -
календарь - класс

1й способ
Calendar.render('selector', {
	month: fdfdf,
	day: llkl,
	format: () => {

	}
});
var calendar = new Calendar({
		month: fdfdf,
	day: llkl,
	format: () => {

	}
})

2й способ
Renderer.create(document.querySelector('rererer'), calendar.template);
паттерн стратегия - интефейсы, рендерер, генерация по функциям
strategy.js
пример
RenderStrategy.prototype.create = function()

Renderer.create(document.querySelector('rererer'), calendar, {
	notes: 6,
	draw: CalendarRenderer.draw
});

или паттерн бридж bridge
conEm - консоль удобная
npm - пакетный менеджер node packet manadger
bawer
