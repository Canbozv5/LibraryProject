# Reaktif Kütüphane Yönetim Sistemi (React LMS)

Bu proje, güçlü bir **React** ön yüzü ve modern **Tailwind CSS** stil kütüphanesi kullanılarak geliştirilmiş, kapsamlı bir Kütüphane Yönetim Sistemi'nin (LMS) ön yüz uygulamasıdır. Yazarlar, kitaplar, yayıncılar, kategoriler ve ödünç alma kayıtları gibi tüm temel kütüphane varlıkları için tam **CRUD** (Oluşturma, Okuma, Güncelleme, Silme) işlevselliği sunar.

## Canlı Demoya Ulaşmak İçin

📌 [Web Site Link](https://canslibraryproject.netlify.app) 📌

---

## Uygulamanın Ufak Bir Önizlemesi

![Web sitesinin önizlemesi](/src/assets/images/review.jpg)

---

![Web sitesinin önizlemesi](/src/assets/images/review2.jpg)

---

## İçindekiler

- [Genel Bakış](#genel-bakış)
- [Özellikler](#özellikler)
- [Kullanılan Teknolojiler](#kullanılan-teknolojiler)
- [Çalışma Mantığı / Dosya Yapısı](#çalışma-mantığı--dosya-yapısı)
- [Katkıda Bulunma](#katkıda-bulunma)
- [İletişim](#iletişim)

## Genel Bakış

Bu proje, bir kütüphanenin günlük operasyonlarını dijitalleştirmek için tasarlanmıştır. Kullanıcı dostu arayüzü sayesinde kütüphane görevlileri; yeni kitap, yazar, yayıncı ve kategori kayıtları oluşturabilir, mevcut kayıtları güncelleyebilir ve silebilir. Özellikle **ödünç alma/verme (Borrow)** modülü, kütüphane ve okuyucu arasındaki ilişkiyi takip etmeye olanak tanır. Uygulama, güçlü bir **Route** yapısı ve koyu temalı, şık bir Tailwind CSS tasarımıyla dikkat çekmektedir.

## Özellikler

- **Tam CRUD İşlevi:** Yazarlar, Kitaplar, Yayıncılar, Kategoriler ve Ödünç Alma kayıtları için tam oluşturma, okuma, güncelleme ve silme (CRUD) desteği.
- **İlişkisel Veri Yönetimi:** Kitap ekleme formunda, mevcut Yazar, Yayıncı ve Kategorilerin listeleri API'den çekilerek dinamik olarak seçim seçenekleri sunulur.
- **Bildirim Sistemi:** Tüm CRUD işlemleri için kullanıcıya anlık geri bildirim sağlamak amacıyla **`react-toastify`** kütüphanesi kullanılır.
- **Gelişmiş Navigasyon:** Tüm yönetim modüllerine kolay erişim sağlayan, `react-router-dom` ile tasarlanmış şık bir üst menü (`Header.jsx`).
- **Koyu Tema ve Tasarım:** Proje genelinde uygulanan karanlık, sarı/beyaz vurgulu renk paleti ve modern bir görünüm için özelleştirilmiş **Tailwind CSS** sınıfları.
- **Tekrar Kullanılabilir Bileşenler:** Formlar (`*Form.jsx`) ve Listeler (`*List.jsx`) gibi temel yapılar, farklı modüller için tutarlı bir şekilde tasarlanmıştır.

## Kullanılan Teknolojiler

- **React:** Uygulamanın temelini oluşturan JavaScript kütüphanesi.
  - `useState`, `useEffect` gibi React Hook'ları ile etkin durum ve yan etki yönetimi.
- **Tailwind CSS:** Hızlı ve esnek bir şekilde stil oluşturmak için kullanılan yardımcı sınıflara dayalı CSS çerçevesi.
- **`react-router-dom`:** Sayfalar arası geçişi ve uygulamanın çok sayfalı yapısını yönetmek için (Routing).
- **API Entegrasyonu:** (Tahmini olarak) Arka uç servisiyle iletişim kurmak için modüler **`api`** servisleri (örneğin, `authorService.js`, `bookService.js`).
- **`react-toastify`:** Başarı ve hata bildirimlerini göstermek için.

## Çalışma Mantığı / Dosya Yapısı

Proje, temiz ve yönetilebilir bir mimariyi takip eder:

1.  **Ana Yapı:**
    - **`App.jsx`:** Ana yönlendirme mantığını (`BrowserRouter`, `Routes`) tanımlar ve `Layout` bileşenini içerir.
    - **`Layout.jsx`:** Tüm uygulamayı saran ana bileşendir. `Header` ve mevcut sayfa içeriğini (`Outlet`) görüntüler.
    - **`Header.jsx`:** Ana menü navigasyonunu ve sayfa altındaki footer alanını barındırır.
    - **`index.css`:** Tailwind CSS direktiflerini ve genel sayfa arka plan stilini tanımlar (koyu arkaplan ve arka plan görseli).
2.  **Sayfalar (`/Pages`):**
    - **`HomePage.jsx`:** Uygulamanın açılış sayfası ve karşılama ekranı.
3.  **Yönetim Modülleri (`/Components/Authors`, `/Components/Books` vb.):**
    - **`*List.jsx`:** İlgili varlıkların (Yazar, Kitap, vb.) listesini API'den çekip tablo formatında gösterir, silme ve düzenleme işlemlerini yönetir.
    - **`*Form.jsx`:** Yeni kayıt oluşturma veya mevcut kaydı güncelleme mantığını ve form yapısını içerir. Bu bileşenler `onSuccess` ve `onClose` gibi prop'lar ile formun açılıp kapanmasını ve listeyi yenilemesini sağlar.

## Katkıda Bulunma

Projeye katkıda bulunmak isterseniz, lütfen aşağıdaki adımları izleyin:

1.  Bu depoyu (repository) **fork edin**.
2.  Yeni bir dal (branch) oluşturun: `git checkout -b feature/AmazingFeature`
3.  Değişikliklerinizi yapın ve commit edin: `git commit -m 'Yeni Özellik: [Kısa Açıklama]'`
4.  Dalı push edin: `git push origin feature/AmazingFeature`
5.  Bir **Pull Request (PR)** oluşturun.

## İletişim

Can BOZ - [LinkedIn](https://www.linkedin.com/in/emrecanboz)
