<div dir="rtl">
<h1 align="center">React Aptor</h1>
<p align="center"><img src="../assets/logo.svg" width="450"></p>
<p align="center">متصل کننده third-partyهای مستقل به react</p>

---

برخی از پکیج‌ها به صورت کاملا مستقل در javascript یا typescript توسعه داده می‌شوند تا بتوان از آنها در هر framework یا library دیگری استفاده کرد.

ارتباط این پکیچ‌ها با react کار ساده‌ای نیست (حداقل نه تا قبل از توسعه react-aptor)، از طرفی
توسعه نسخه قابل استفاده در react این پکیج‌ها گاهاً توسط تیم متفاوتی از تیم اصلی توسعه دهنده‌ی third-party صورت میگیرید و این یعنی که توسعه
نسخه react میتوانند یک مرحله عقب‌تر از نسخه اصلی باشد، یا حتی در مواقغی به صورت کامل متوقف شود.

از طرفی کم بودن تعداد contributors روی نسخه react، انتخاب ساختار نامناسب و الگو‌های بد پیاده سازی ممکن است در اینده پیاده سازی ویژگی‌های جدید پکیج اصلی را سخت و یا حتی غیر ممکن کند.

- استفاده از findDOMNode برای پیدا کردن المان‌ها
- استفاده بسیار زیاد از روش‌های memoization برای بهبود زمان لود و جلوگیری از re-render
- حجم زیاد این پروژه‌ها به علت تعریف دوباره اغلب ویژگی‌های پکیچ اصلی برای react
- برخی از این پکیج‌ها به صورت global در برنامه تعریف میشوند و توانایی استفاده دو نمونه از آنها در پروژه وجود ندارد.

## react-aptor

ما در react-aptor سعی کردیم تمام مشکلات ذکر شده در را رفع کنیم.

### کوچک

حجم این پروژه بسیار پایین است. کمتر از ۱ کیلو بایت (۳۵۲ بایت).

### قابل تغییر

دسترسی برای تعریف apiهای مورد نیاز کاملا در دست شماست.

### react-ish

کلیه پروژه با استاندار‌های react نوشته شده و سعی شده هیچ ضد-الگویی (anti-pattern) ای در آن استفاده نشود.

### ساده

استفاده از این پیکج بسیار ساده است.

### Typescript

پروژه با typescript توسعه داده شده و توانایی استفاده از ویژگی‌های زیر را به شما میدهد:

- auto-complete
- type-checking

## نحوه استفاده

برای استفاده از این پکیج شما باید سه عمل زیر را انجام دهید
(برای استاندارد سازی پروژه ما از نام‌گاری بخصوصی استفاده کردیم.)

1. پکیج مربوط را instantiate (معرفی) کنید
2. api خود را تعریف کنید.
3. پکیج را به وسیله react-aptor به react متصل کنید.

## مراحل

### مرحله اول

> پکیج مربوط را instantiate (معرفی) بکنید

این تابع باید نمونه پکیجی که استفاده می‌کنید را به عنوان خروجی باز گرداند. همچنین شما به عنوان ورودی‌های که react-aptor در اختیار شما میگذارد به node و پارمتر‌های تعریفی خودتان نیز دسترسی دارید (params).

> هشدار: ممکن است نیاز به new کرد نباشد، این عمل به عنوان مثال و اینکه پر کاربرد بوده استفاده شده.

<p align="center"><img src="../assets/construct.svg" ></p>

### مرحله دوم

> api خود را تعریف کنید.

<p align="center"><img src="../assets/api.svg" ></p>

برای این منظور شما نیاز به تعریف یک تابع به اسم `getAPI` را دارید. این تابع در حقیقت نقش `api-generator` (تولید کننده api) شما را خواهد داشت.
تابع شما دو ورودی‌ instance (نمونه پکیجی که استفاده می‌کنید) و params (تمام تنظیمات مورد نیازی که خودتان تعریف کرده‌اید) را در هنگام استفاده از react-aptor دریافت خواهد کرد.

به عنوان خروحی این تابع، باید تابعی را برگردانید (return) که
هیچ ورودی نمی‌گیرد! اما خروحی این تابع object ای شامل api های شما به صورت key value خواهد‌بود.
در تعرایف api های خود میتوانید از instance و params به صورت کامل استفاده کنید.

### مرحله سوم

> پکیج را به وسیله react-aptor به react متصل کنید.

<p align="center"><img src="../assets/connector.svg"></p>

برای اتصال api ها به react شما نیاز دارید که یک `component forwardRef` تعریف کنید و forwarded-ref به همراه توابع تعریف شده در مرحله ۱ و مرحله ۲ را به `useAptor` تحویل بدهید. useAptor به عنوان خروجی یک ref به شما باز‌میگرداند که نیاز است آن را به المان dom ای که تعریف کرده‌اید متصل کنید.

### استفاده از api هایی که تعریف شده

<p align="center"><img src="../assets/usage.svg"></p>

برای استفاده از api ها در scope (لایه) بالاتر نیاز است از `createRef` در react یک ref بسازید
استفاده کرده و آن را به `Connector` که در مرحله ۳ تعریف کردیم تحویل بدهید. به این ترتیب میتوانید به تمامی api ها از طریق `ref.current` دسترسی پیدا کرد.

## حمایت مالی از

🎨 طراح (**بیت‌کوین**):
`bc1q9fahyct3lrdz47pjf4kfxvsyum2dm74v2hv9xl`

💻 توسعه‌دهنده (**بیت‌کوین**):
`bc1qq8qq63ex7svkkjdjn5axu8angfxytvs83nlujk`

<a href="https://idpay.ir/amirhe"><img width="150" src="https://static.idpay.ir/logo/logo.svg"></a>

## مثال‌ها

### `typescript` + [Quill.js](https://github.com/quilljs/quill)

[مثال نحوه اتصال quill به react](https://codesandbox.io/s/react-aptor--quill-iqwcd)

### [Fabric.js](http://fabricjs.com/)

[مثال نحوه اتصال fabric به react](https://codesandbox.io/s/react-aptor--fabric-hp50c)

### [Rive.js](https://rive.app)

[مثال نحوه اتصال rive به react](https://stackblitz.com/edit/react-aptor-rivejs)

### [Howler.js]

[مثال نحوه اتصال howler به react](https://codesandbox.io/s/react-aptor--howler-4o8t4)

<p align="center"><a href="../samples.md">مشاهده تمام نمونه‌ها</a></p>
</div>
