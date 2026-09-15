import React, { useState, useMemo } from "react";
import { Plus, Minus, Store, Package, Hammer, Wallet, Users, TrendingUp, TrendingDown, AlertTriangle, ShoppingBag, Receipt, Trash2, ClipboardList, Megaphone, Check, Contact, BadgePercent } from "lucide-react";

const fmt = (n) => Math.round(n).toLocaleString("ru-RU");

function Stepper({ label, value, onChange, step = 1, min = 0, max = Infinity, suffix = "", decimals = 0 }) {
  const display = decimals > 0 ? value.toFixed(decimals) : fmt(value);
  const clamp = (v) => Math.min(max, Math.max(min, v));
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #E7DDD6" }}>
      <span style={{ fontSize: 14, color: "#4A3B45", maxWidth: "58%" }}>{label}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button
          onClick={() => onChange(clamp(+(value - step).toFixed(2)))}
          aria-label="уменьшить"
          style={btnStyle}
        >
          <Minus size={14} color="#7A3B54" />
        </button>
        <span style={{ fontFamily: "Georgia, serif", fontVariantNumeric: "tabular-nums", fontSize: 15, minWidth: 84, textAlign: "center", color: "#2E2430" }}>
          {display}{suffix}
        </span>
        <button
          onClick={() => onChange(clamp(+(value + step).toFixed(2)))}
          aria-label="увеличить"
          style={btnStyle}
        >
          <Plus size={14} color="#7A3B54" />
        </button>
      </div>
    </div>
  );
}

const btnStyle = {
  width: 28,
  height: 28,
  borderRadius: "50%",
  border: "1px solid #D8B9C4",
  background: "#FFFFFF",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};

function Slider({ label, value, onChange, min = 0, max = 100, step = 1, suffix = "%" }) {
  return (
    <div style={{ padding: "10px 0", borderBottom: "1px solid #E7DDD6" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 14, color: "#4A3B45" }}>{label}</span>
        <span style={{ fontFamily: "Georgia, serif", fontSize: 15, color: "#2E2430" }}>{value}{suffix}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: "#B4728C" }}
      />
    </div>
  );
}

function Section({ icon, title, note, children }) {
  return (
    <div style={{ background: "#FFFFFF", border: "1px solid #EFE6DF", borderRadius: 14, padding: "20px 22px", marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
        {icon}
        <h3 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 19, color: "#2E2430", margin: 0 }}>{title}</h3>
      </div>
      {note && <p style={{ fontSize: 13, color: "#8A7C85", margin: "0 0 8px 0" }}>{note}</p>}
      {children}
    </div>
  );
}

export default function BoutiquePlanner() {
  // Помещение
  const [area, setArea] = useState(40);
  const [rentPerM2, setRentPerM2] = useState(6000);

  // Товар
  const [itemsQty, setItemsQty] = useState(300);
  const [avgPurchasePrice, setAvgPurchasePrice] = useState(8000);
  const [markup, setMarkup] = useState(100);
  const [deliveryCost, setDeliveryCost] = useState(150000);
  const [itemsPerPurchase, setItemsPerPurchase] = useState(1.3);

  // Разовые расходы на открытие
  const [renovation, setRenovation] = useState(800000);
  const [equipment, setEquipment] = useState(1200000);
  const [signage, setSignage] = useState(200000);
  const [registration, setRegistration] = useState(100000);
  const [initialMarketing, setInitialMarketing] = useState(150000);

  // Касса и техника для продажи
  const [cashRegister, setCashRegister] = useState(350000);
  const [laptop, setLaptop] = useState(300000);
  const [scanner, setScanner] = useState(80000);
  const [posSoftwareMonthly, setPosSoftwareMonthly] = useState(15000);

  // Налоговый отчёт
  const now = new Date();
  const currentMonthValue = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const [reportMonth, setReportMonth] = useState(currentMonthValue);
  const [taxRate, setTaxRate] = useState(3);

  // План по привлечению клиентов
  const marketingChannels = [
    { id: "smm", title: "Instagram и TikTok", desc: "Регулярные фото и видео новинок, образы (look-book), отзывы покупательниц — ведёт SMM-специалист из раздела расходов." },
    { id: "opening", title: "Открытие с акцией", desc: "Скидка или подарок первым покупателям в день открытия, розыгрыш — формирует первый поток и отзывы." },
    { id: "bloggers", title: "Блогеры и локальные инфлюенсеры", desc: "Бартер или платное размещение у блогеров города — обзор бутика, примерка образов." },
    { id: "loyalty", title: "Программа лояльности", desc: "Скидка или бонус на вторую покупку, карта постоянного клиента — повышает повторные визиты." },
    { id: "partners", title: "Партнёрство с салонами и фитнес-центрами", desc: "Кросс-промо с бьюти-салонами, студиями — обмен клиентами через флаеры и совместные акции." },
    { id: "geo", title: "Геотаргетированная реклама", desc: "Реклама в соцсетях по радиусу вокруг бутика + листовки в ближайших жилых комплексах и офисах." },
    { id: "window", title: "Витрина и вход", desc: "Яркое оформление витрины под сезон — главный бесплатный канал для потока с улицы." },
    { id: "referral", title: "Приведи подругу", desc: "Бонус обеим покупательницам за рекомендацию — недорогой канал с высоким доверием." },
  ];
  const [completedChannels, setCompletedChannels] = useState({});
  const toggleChannel = (id) => setCompletedChannels((c) => ({ ...c, [id]: !c[id] }));
  const completedCount = Object.values(completedChannels).filter(Boolean).length;

  // Риски банкротства
  const bankruptcyRisks = [
    { title: "Продажи ниже точки безубыточности", severity: "high", desc: "Если реальный поток покупателей стабильно ниже расчётного минимума — бутик работает в убыток каждый месяц. Отслеживайте посещаемость и конверсию еженедельно." },
    { title: "Затоваривание и неликвид", severity: "high", desc: "Деньги «замораживаются» в непроданном товаре, если закупка не соответствует спросу. Планируйте закупки по остаткам из таблицы ревизии, а не наугад." },
    { title: "Кассовый разрыв перед новой закупкой", severity: "high", desc: "Нет свободных денег на пополнение ассортимента вовремя — полки пустеют, продажи падают. Держите резерв на 1–2 закупки вперёд." },
    { title: "Рост аренды или потеря помещения", severity: "medium", desc: "Повышение ставки или отказ в продлении договора резко увеличивает расходы. Фиксируйте условия в долгосрочном договоре аренды." },
    { title: "Сезонность спроса", severity: "medium", desc: "Межсезонье и спады после праздников снижают выручку. Закладывайте резерв на 1–2 «слабых» месяца в году." },
    { title: "Скачок закупочных цен и курса валют", severity: "medium", desc: "Импортный товар дорожает при росте курса — маржа сжимается, если розничная цена не пересматривается вовремя." },
    { title: "Уход ключевого продавца", severity: "medium", desc: "Один человек, знающий постоянных клиентов, уходит — часть продаж уходит вместе с ним. Стоит вести базу клиентов отдельно от продавца." },
    { title: "Конкуренция маркетплейсов и соседних точек", severity: "medium", desc: "Демпинг цен онлайн снижает поток в офлайн-бутик. Отстройка через сервис, примерку и атмосферу — то, что маркетплейс не даёт." },
    { title: "Неэффективный маркетинг", severity: "low", desc: "Бюджет на SMM и рекламу тратится, но не приносит покупателей. Проверяйте, окупает ли выручка от новых клиентов расходы на их привлечение." },
  ];
  const riskColor = { high: "#B23B3B", medium: "#A9835B", low: "#6B8F71" };
  const riskLabel = { high: "высокий риск", medium: "средний риск", low: "низкий риск" };

  // База клиентов и программа лояльности
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({ name: "", phone: "", purchasesCount: 1, totalSpent: 0 });
  const [clientError, setClientError] = useState("");
  const [loyaltyThreshold, setLoyaltyThreshold] = useState(3);
  const [loyaltyDiscount, setLoyaltyDiscount] = useState(10);

  const addClient = () => {
    if (!newClient.name.trim()) {
      setClientError("Укажите имя клиента");
      return;
    }
    if (!newClient.phone.trim()) {
      setClientError("Укажите телефон клиента");
      return;
    }
    setClients((list) => [
      { id: Date.now(), name: newClient.name.trim(), phone: newClient.phone.trim(), purchasesCount: newClient.purchasesCount, totalSpent: newClient.totalSpent },
      ...list,
    ]);
    setNewClient({ name: "", phone: "", purchasesCount: 1, totalSpent: 0 });
    setClientError("");
  };
  const removeClient = (id) => setClients((list) => list.filter((c) => c.id !== id));
  const isLoyal = (c) => c.purchasesCount >= loyaltyThreshold;
  const loyalClientsCount = clients.filter(isLoyal).length;

  // Ревизия продаж
  const today = new Date().toISOString().slice(0, 10);
  const [salesLog, setSalesLog] = useState([]);
  const [newSale, setNewSale] = useState({ date: today, name: "", qty: 1, price: 0 });
  const [saleError, setSaleError] = useState("");

  const addSale = () => {
    if (!newSale.name.trim()) {
      setSaleError("Укажите название товара");
      return;
    }
    if (newSale.qty <= 0) {
      setSaleError("Количество должно быть больше нуля");
      return;
    }
    setSalesLog((log) => [
      { id: Date.now(), receiptNo: log.length + 1, date: newSale.date, name: newSale.name.trim(), qty: newSale.qty, price: newSale.price },
      ...log,
    ]);
    setNewSale({ date: newSale.date, name: "", qty: 1, price: newSale.price });
    setSaleError("");
  };

  const removeSale = (id) => setSalesLog((log) => log.filter((s) => s.id !== id));

  // Ежемесячные расходы
  const [salary, setSalary] = useState(250000);
  const [utilities, setUtilities] = useState(100000);
  const [advertisingMonthly, setAdvertisingMonthly] = useState(100000);
  const [smmMonthly, setSmmMonthly] = useState(120000);
  const [acquiringPercent, setAcquiringPercent] = useState(5);

  // Посещаемость
  const [visitorsPerDay, setVisitorsPerDay] = useState(15);
  const [conversion, setConversion] = useState(25);
  const [workDays, setWorkDays] = useState(26);

  const calc = useMemo(() => {
    const rentMonthly = area * rentPerM2;
    const oneTimeCosts = renovation + equipment + signage + registration + initialMarketing + cashRegister + laptop + scanner;
    const stockPurchase = itemsQty * avgPurchasePrice;
    const initialStockCost = stockPurchase + deliveryCost;
    const totalInitialInvestment = oneTimeCosts + initialStockCost;

    const retailPrice = avgPurchasePrice * (1 + markup / 100);
    const avgCheck = retailPrice * itemsPerPurchase;

    const dailyBuyers = visitorsPerDay * (conversion / 100);
    const dailyRevenue = dailyBuyers * avgCheck;
    const monthlyRevenue = dailyRevenue * workDays;

    const cogsPercent = 100 / (1 + markup / 100);
    const cogsMonthly = monthlyRevenue * (cogsPercent / 100);
    const acquiringMonthly = monthlyRevenue * (acquiringPercent / 100);

    const monthlyFixed = rentMonthly + salary + utilities + advertisingMonthly + smmMonthly + acquiringMonthly + posSoftwareMonthly;
    const netProfit = monthlyRevenue - monthlyFixed - cogsMonthly;
    const paybackMonths = netProfit > 0 ? totalInitialInvestment / netProfit : null;

    const monthlyFixedExclAcquiring = rentMonthly + salary + utilities + advertisingMonthly + smmMonthly + posSoftwareMonthly;
    const marginShare = 1 - cogsPercent / 100 - acquiringPercent / 100;
    const breakevenRevenue = marginShare > 0 ? monthlyFixedExclAcquiring / marginShare : Infinity;
    const breakevenDailyRevenue = breakevenRevenue / workDays;
    const breakevenVisitors = avgCheck > 0 && conversion > 0 ? breakevenDailyRevenue / avgCheck / (conversion / 100) : Infinity;
    const marginOfSafety = breakevenVisitors > 0 ? ((visitorsPerDay - breakevenVisitors) / breakevenVisitors) * 100 : 0;
    const runwayMonths = netProfit < 0 ? totalInitialInvestment / Math.abs(netProfit) : null;

    return {
      rentMonthly, oneTimeCosts, stockPurchase, initialStockCost, totalInitialInvestment,
      retailPrice, avgCheck, dailyBuyers, dailyRevenue, monthlyRevenue,
      cogsPercent, cogsMonthly, acquiringMonthly, monthlyFixed, netProfit, paybackMonths,
      breakevenRevenue, breakevenVisitors, marginOfSafety, runwayMonths,
    };
  }, [area, rentPerM2, itemsQty, avgPurchasePrice, markup, deliveryCost, itemsPerPurchase,
      renovation, equipment, signage, registration, initialMarketing, cashRegister, laptop, scanner,
      salary, utilities, advertisingMonthly, smmMonthly, acquiringPercent, posSoftwareMonthly,
      visitorsPerDay, conversion, workDays]);

  const monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
  const reportLabel = useMemo(() => {
    const [y, m] = reportMonth.split("-");
    return `${monthNames[Number(m) - 1]} ${y}`;
  }, [reportMonth]);

  const monthlyReport = useMemo(() => {
    const rows = salesLog.filter((r) => r.date && r.date.startsWith(reportMonth)).sort((a, b) => a.receiptNo - b.receiptNo);
    const revenue = rows.reduce((s, r) => s + Number(r.qty) * Number(r.price), 0);
    const qty = rows.reduce((s, r) => s + Number(r.qty), 0);
    const tax = revenue * (taxRate / 100);
    return { rows, revenue, qty, tax, receiptsCount: rows.length };
  }, [salesLog, reportMonth, taxRate]);

  const salesTotals = useMemo(() => {
    const totalQty = salesLog.reduce((s, r) => s + Number(r.qty), 0);
    const totalRevenue = salesLog.reduce((s, r) => s + Number(r.qty) * Number(r.price), 0);
    const remainingStock = itemsQty - totalQty;
    return { totalQty, totalRevenue, remainingStock };
  }, [salesLog, itemsQty]);

  const iconProps = { size: 20, color: "#7A3B54" };

  return (
    <div style={{ background: "#FAF6F2", minHeight: "100%", padding: "28px 16px", fontFamily: "-apple-system, Segoe UI, Roboto, sans-serif" }}>
      <div style={{ maxWidth: 980, margin: "0 auto" }}>

        <header style={{ marginBottom: 22 }}>
          <p style={{ fontSize: 13, color: "#B4728C", margin: "0 0 4px 0", letterSpacing: 0.3 }}>Бизнес-план</p>
          <h1 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 32, color: "#2E2430", margin: 0 }}>
            Открытие женского бутика Erke
          </h1>
          <p style={{ fontSize: 14, color: "#6B5D68", marginTop: 8, maxWidth: 620 }}>
            Меняйте параметры ниже — расчёт вложений, аренды и прибыли обновляется сразу. Суммы в тенге (₸), значения по умолчанию можно скорректировать под ваш город и формат бутика.
          </p>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr)", gap: 0 }}>
          <div className="boutique-grid" style={gridResponsive}>
            <div>

              <Section icon={<Store {...iconProps} />} title="Помещение и аренда">
                <Stepper label="Торговая площадь бутика" value={area} onChange={setArea} step={5} min={10} max={300} suffix=" м²" />
                <Stepper label="Ставка аренды за 1 м² в месяц" value={rentPerM2} onChange={setRentPerM2} step={500} min={1000} suffix=" ₸" />
                <div style={resultRow}>
                  <span>Аренда бутика в месяц</span>
                  <b>{fmt(calc.rentMonthly)} ₸</b>
                </div>
              </Section>

              <Section icon={<Package {...iconProps} />} title="Товар и поставки">
                <Stepper label="Количество единиц товара в первой партии" value={itemsQty} onChange={setItemsQty} step={10} min={10} max={5000} suffix=" шт" />
                <Stepper label="Средняя закупочная цена за единицу" value={avgPurchasePrice} onChange={setAvgPurchasePrice} step={500} min={500} suffix=" ₸" />
                <Slider label="Торговая наценка" value={markup} onChange={setMarkup} min={20} max={300} step={5} />
                <Stepper label="Доставка партии (логистика, растаможка)" value={deliveryCost} onChange={setDeliveryCost} step={10000} min={0} suffix=" ₸" />
                <Stepper label="Среднее число товаров в одном чеке" value={itemsPerPurchase} onChange={setItemsPerPurchase} step={0.1} min={1} max={5} decimals={1} />
                <div style={resultRow}>
                  <span>Розничная цена / средний чек</span>
                  <b>{fmt(calc.retailPrice)} ₸ / {fmt(calc.avgCheck)} ₸</b>
                </div>
                <div style={resultRow}>
                  <span>Стоимость закупки партии + доставка</span>
                  <b>{fmt(calc.initialStockCost)} ₸</b>
                </div>
              </Section>

              <Section icon={<Hammer {...iconProps} />} title="Разовые расходы на открытие">
                <Stepper label="Ремонт и дизайн торгового зала" value={renovation} onChange={setRenovation} step={50000} suffix=" ₸" />
                <Stepper label="Оборудование (стеллажи, зеркала, касса, свет)" value={equipment} onChange={setEquipment} step={50000} suffix=" ₸" />
                <Stepper label="Вывеска и оформление витрины" value={signage} onChange={setSignage} step={10000} suffix=" ₸" />
                <Stepper label="Регистрация ИП/ООО, кассовое ПО, разрешения" value={registration} onChange={setRegistration} step={10000} suffix=" ₸" />
                <Stepper label="Реклама и продвижение к открытию" value={initialMarketing} onChange={setInitialMarketing} step={10000} suffix=" ₸" />
                <div style={resultRow}>
                  <span>Итого разовых расходов</span>
                  <b>{fmt(calc.oneTimeCosts)} ₸</b>
                </div>
              </Section>

              <Section icon={<Receipt {...iconProps} />} title="Касса и техника для продажи">
                <Stepper label="Кассовый аппарат / фискальный регистратор" value={cashRegister} onChange={setCashRegister} step={10000} suffix=" ₸" />
                <Stepper label="Ноутбук для учёта и кассовой программы" value={laptop} onChange={setLaptop} step={10000} suffix=" ₸" />
                <Stepper label="Сканер штрихкодов" value={scanner} onChange={setScanner} step={5000} suffix=" ₸" />
                <Stepper label="Кассовая программа для хранения чеков (абонплата)" value={posSoftwareMonthly} onChange={setPosSoftwareMonthly} step={1000} suffix=" ₸/мес" />
                <div style={resultRow}>
                  <span>Итого на кассу и технику (разово)</span>
                  <b>{fmt(cashRegister + laptop + scanner)} ₸</b>
                </div>
                <p style={{ fontSize: 12, color: "#8A7C85", margin: "8px 0 0 0" }}>
                  Каждая продажа, внесённая в таблицу ревизии ниже, сохраняется в этой программе как отдельный чек с номером и попадает в ежемесячный отчёт для налоговой.
                </p>
              </Section>

              <Section icon={<Wallet {...iconProps} />} title="Ежемесячные расходы">
                <Stepper label="Зарплата продавцов" value={salary} onChange={setSalary} step={10000} suffix=" ₸" />
                <Stepper label="Коммунальные платежи" value={utilities} onChange={setUtilities} step={5000} suffix=" ₸" />
                <Stepper label="Реклама и продвижение" value={advertisingMonthly} onChange={setAdvertisingMonthly} step={5000} suffix=" ₸" />
                <Stepper label="Услуги SMM-специалиста (продвижение товара в соцсетях)" value={smmMonthly} onChange={setSmmMonthly} step={5000} suffix=" ₸" />
                <Slider label="Эквайринг и налоги (% от выручки)" value={acquiringPercent} onChange={setAcquiringPercent} min={1} max={15} step={0.5} />
                <div style={resultRow}>
                  <span>Аренда (из раздела выше)</span>
                  <b>{fmt(calc.rentMonthly)} ₸</b>
                </div>
                <div style={resultRow}>
                  <span>Итого постоянных расходов в месяц</span>
                  <b>{fmt(calc.rentMonthly + salary + utilities + advertisingMonthly + smmMonthly + posSoftwareMonthly)} ₸ + эквайринг</b>
                </div>
              </Section>

              <Section icon={<Megaphone {...iconProps} />} title="План по привлечению клиентов" note={`Отмечайте выполненные шаги — ${completedCount} из ${marketingChannels.length} готово.`}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 8 }}>
                  {marketingChannels.map((ch) => (
                    <label
                      key={ch.id}
                      style={{
                        display: "flex", gap: 10, alignItems: "flex-start", cursor: "pointer",
                        padding: "10px 12px", borderRadius: 10,
                        background: completedChannels[ch.id] ? "#F4EDE1" : "#FBF7F4",
                        border: "1px solid #EFE6DF",
                      }}
                    >
                      <span
                        onClick={(e) => { e.preventDefault(); toggleChannel(ch.id); }}
                        style={{
                          width: 20, height: 20, borderRadius: 6, flexShrink: 0, marginTop: 1,
                          border: "1px solid #D8B9C4",
                          background: completedChannels[ch.id] ? "#7A3B54" : "#FFFFFF",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                      >
                        {completedChannels[ch.id] && <Check size={13} color="#FFFFFF" />}
                      </span>
                      <span>
                        <span style={{
                          fontSize: 14, color: "#2E2430",
                          textDecoration: completedChannels[ch.id] ? "line-through" : "none",
                        }}>{ch.title}</span>
                        <p style={{ fontSize: 12.5, color: "#8A7C85", margin: "2px 0 0 0" }}>{ch.desc}</p>
                      </span>
                    </label>
                  ))}
                </div>
              </Section>

              <Section icon={<Users {...iconProps} />} title="Посещаемость и продажи" note="Задайте минимально ожидаемый поток покупателей — на нём и строится расчёт прибыли.">
                <Stepper label="Минимум посетителей в день" value={visitorsPerDay} onChange={setVisitorsPerDay} step={1} min={1} max={300} suffix=" чел" />
                <Slider label="Конверсия в покупку" value={conversion} onChange={setConversion} min={5} max={80} step={1} />
                <Stepper label="Рабочих дней в месяц" value={workDays} onChange={setWorkDays} step={1} min={20} max={31} suffix=" дн" />
                <div style={resultRow}>
                  <span>Покупателей в день / выручка в день</span>
                  <b>{calc.dailyBuyers.toFixed(1)} чел / {fmt(calc.dailyRevenue)} ₸</b>
                </div>
              </Section>

            </div>

            <div>
              <div style={{ position: "sticky", top: 16 }}>
                <div style={{ background: "#2E2430", borderRadius: 16, padding: "24px 22px", color: "#F3EAE4" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
                    <ShoppingBag size={18} color="#D8AFC0" />
                    <span style={{ fontSize: 13, color: "#D8AFC0" }}>Итоги при минимальной посещаемости</span>
                  </div>

                  <div style={{ marginBottom: 18 }}>
                    <p style={{ fontSize: 12, color: "#B49AA6", margin: "0 0 4px 0" }}>Начальные вложения на открытие</p>
                    <p style={{ fontFamily: "Georgia, serif", fontSize: 26, margin: 0, color: "#FFFFFF" }}>{fmt(calc.totalInitialInvestment)} ₸</p>
                    <p style={{ fontSize: 12, color: "#B49AA6", margin: "2px 0 0 0" }}>
                      из них {fmt(calc.oneTimeCosts)} ₸ разовые + {fmt(calc.initialStockCost)} ₸ первая партия товара
                    </p>
                  </div>

                  <div style={{ height: 1, background: "#453A48", margin: "16px 0" }} />

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                    <div>
                      <p style={{ fontSize: 12, color: "#B49AA6", margin: "0 0 4px 0" }}>Выручка в месяц</p>
                      <p style={{ fontFamily: "Georgia, serif", fontSize: 19, margin: 0 }}>{fmt(calc.monthlyRevenue)} ₸</p>
                    </div>
                    <div>
                      <p style={{ fontSize: 12, color: "#B49AA6", margin: "0 0 4px 0" }}>Расходы в месяц</p>
                      <p style={{ fontFamily: "Georgia, serif", fontSize: 19, margin: 0 }}>{fmt(calc.monthlyFixed + calc.cogsMonthly)} ₸</p>
                    </div>
                  </div>

                  <div style={{
                    background: calc.netProfit >= 0 ? "#3A3040" : "#4A2A2E",
                    borderRadius: 12, padding: "14px 16px", marginBottom: 16,
                    display: "flex", alignItems: "center", justifyContent: "space-between"
                  }}>
                    <div>
                      <p style={{ fontSize: 12, color: "#D8AFC0", margin: "0 0 4px 0" }}>Чистая прибыль в месяц</p>
                      <p style={{ fontFamily: "Georgia, serif", fontSize: 24, margin: 0, color: "#FFFFFF" }}>
                        {calc.netProfit >= 0 ? "" : "−"}{fmt(Math.abs(calc.netProfit))} ₸
                      </p>
                    </div>
                    {calc.netProfit >= 0
                      ? <TrendingUp size={22} color="#C9E4B0" />
                      : <TrendingDown size={22} color="#E7A6A6" />}
                  </div>

                  {calc.netProfit < 0 && (
                    <div style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 12.5, color: "#E7C6C6", marginBottom: 16 }}>
                      <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
                      <span>При таком минимальном потоке бутик работает в убыток — увеличьте конверсию, средний чек или посещаемость.</span>
                    </div>
                  )}

                  <div style={{ height: 1, background: "#453A48", margin: "16px 0" }} />

                  <div style={{ marginBottom: 14 }}>
                    <p style={{ fontSize: 12, color: "#B49AA6", margin: "0 0 4px 0" }}>Доля дохода на закупку следующей партии товара</p>
                    <p style={{ fontFamily: "Georgia, serif", fontSize: 24, margin: 0 }}>{calc.cogsPercent.toFixed(0)}%</p>
                    <p style={{ fontSize: 12, color: "#B49AA6", margin: "4px 0 0 0" }}>
                      ≈ {fmt(calc.cogsMonthly)} ₸ в месяц — эта сумма возвращается в закупку, чтобы восполнить проданный товар
                    </p>
                  </div>

                  <div>
                    <p style={{ fontSize: 12, color: "#B49AA6", margin: "0 0 4px 0" }}>Срок окупаемости вложений</p>
                    <p style={{ fontFamily: "Georgia, serif", fontSize: 19, margin: 0 }}>
                      {calc.paybackMonths ? `≈ ${Math.ceil(calc.paybackMonths)} мес` : "не окупается"}
                    </p>
                  </div>
                </div>

                <p style={{ fontSize: 11.5, color: "#9C8E96", marginTop: 10, lineHeight: 1.5 }}>
                  Наценка задаёт и розничную цену, и долю от выручки, которая уходит на закупку нового товара: чем выше наценка — тем меньше эта доля.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ background: "#FFFFFF", border: "1px solid #EFE6DF", borderRadius: 14, padding: "20px 22px", marginTop: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <ClipboardList {...iconProps} />
            <h3 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 19, color: "#2E2430", margin: 0 }}>Ежедневная ревизия проданного товара</h3>
          </div>
          <p style={{ fontSize: 13, color: "#8A7C85", margin: "0 0 16px 0" }}>
            Вносите сюда каждую продажу — так вы отслеживаете реальную выручку и остаток товара на складе.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "flex-end", marginBottom: 8 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={labelStyle}>Дата</label>
              <input type="date" value={newSale.date} onChange={(e) => setNewSale((s) => ({ ...s, date: e.target.value }))} style={inputStyle} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: "1 1 160px" }}>
              <label style={labelStyle}>Товар</label>
              <input type="text" placeholder="Например, платье летнее" value={newSale.name} onChange={(e) => setNewSale((s) => ({ ...s, name: e.target.value }))} style={inputStyle} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={labelStyle}>Кол-во</label>
              <input type="number" min="1" value={newSale.qty} onChange={(e) => setNewSale((s) => ({ ...s, qty: Number(e.target.value) }))} style={{ ...inputStyle, width: 72 }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={labelStyle}>Цена продажи, ₸</label>
              <input type="number" min="0" step="500" value={newSale.price} onChange={(e) => setNewSale((s) => ({ ...s, price: Number(e.target.value) }))} style={{ ...inputStyle, width: 110 }} />
            </div>
            <button onClick={addSale} style={addBtnStyle}>
              <Plus size={15} /> Добавить
            </button>
          </div>
          {saleError && <p style={{ fontSize: 12.5, color: "#B23B3B", margin: "0 0 12px 0" }}>{saleError}</p>}

          {salesLog.length === 0 ? (
            <p style={{ fontSize: 13.5, color: "#8A7C85", padding: "16px 0" }}>Пока нет записей — добавьте первую продажу дня.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
                <thead>
                  <tr>
                    {["Чек №", "Дата", "Товар", "Кол-во", "Цена, ₸", "Сумма, ₸", ""].map((h) => (
                      <th key={h} style={thStyle}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {salesLog.map((row) => (
                    <tr key={row.id}>
                      <td style={tdStyle}>№{row.receiptNo}</td>
                      <td style={tdStyle}>{row.date}</td>
                      <td style={tdStyle}>{row.name}</td>
                      <td style={tdStyle}>{row.qty}</td>
                      <td style={tdStyle}>{fmt(row.price)}</td>
                      <td style={tdStyle}><b>{fmt(row.qty * row.price)}</b></td>
                      <td style={{ ...tdStyle, textAlign: "right" }}>
                        <button onClick={() => removeSale(row.id)} aria-label="удалить запись" style={{ ...btnStyle, borderRadius: 6, width: 26, height: 26 }}>
                          <Trash2 size={13} color="#B23B3B" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 16 }}>
            <div style={summaryChip}>Продано единиц: <b>{fmt(salesTotals.totalQty)}</b></div>
            <div style={summaryChip}>Выручка по ревизии: <b>{fmt(salesTotals.totalRevenue)} ₸</b></div>
            <div style={{ ...summaryChip, color: salesTotals.remainingStock < 0 ? "#B23B3B" : "#7A3B54" }}>
              Остаток на складе: <b>{fmt(salesTotals.remainingStock)} шт</b>
            </div>
          </div>
        </div>

        <div style={{ background: "#FFFFFF", border: "1px solid #EFE6DF", borderRadius: 14, padding: "20px 22px", marginTop: 16 }} className="no-print-wrap">
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }} className="hide-on-print">
            <Receipt {...iconProps} />
            <h3 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 19, color: "#2E2430", margin: 0 }}>Ежемесячный документ для налоговой</h3>
          </div>
          <p style={{ fontSize: 13, color: "#8A7C85", margin: "0 0 16px 0" }} className="hide-on-print">
            Отчёт собирается автоматически из чеков ревизии продаж за выбранный месяц.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "flex-end", marginBottom: 18 }} className="hide-on-print">
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={labelStyle}>Отчётный месяц</label>
              <input type="month" value={reportMonth} onChange={(e) => setReportMonth(e.target.value)} style={inputStyle} />
            </div>
            <div style={{ minWidth: 200 }}>
              <Stepper label="Ставка налога с выручки" value={taxRate} onChange={setTaxRate} step={0.5} min={0} max={20} suffix="%" decimals={1} />
            </div>
            <button onClick={() => window.print()} style={addBtnStyle}>
              <ClipboardList size={15} /> Печать / сохранить как PDF
            </button>
          </div>

          <div className="tax-report-print" style={{ border: "1px solid #E7DDD6", borderRadius: 10, padding: "22px 24px" }}>
            <p style={{ fontSize: 12, color: "#8A7C85", margin: "0 0 2px 0" }}>Отчёт о розничной реализации товара</p>
            <h4 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 20, color: "#2E2430", margin: "0 0 16px 0" }}>
              за {reportLabel}
            </h4>

            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, marginBottom: 18 }}>
              <tbody>
                <tr>
                  <td style={docRowLabel}>Количество чеков</td>
                  <td style={docRowValue}>{monthlyReport.receiptsCount}</td>
                </tr>
                <tr>
                  <td style={docRowLabel}>Продано единиц товара</td>
                  <td style={docRowValue}>{fmt(monthlyReport.qty)}</td>
                </tr>
                <tr>
                  <td style={docRowLabel}>Выручка за месяц</td>
                  <td style={docRowValue}><b>{fmt(monthlyReport.revenue)} ₸</b></td>
                </tr>
                <tr>
                  <td style={docRowLabel}>Ставка налога</td>
                  <td style={docRowValue}>{taxRate.toFixed(1)}%</td>
                </tr>
                <tr>
                  <td style={docRowLabel}>Сумма налога к уплате</td>
                  <td style={docRowValue}><b>{fmt(monthlyReport.tax)} ₸</b></td>
                </tr>
              </tbody>
            </table>

            {monthlyReport.rows.length === 0 ? (
              <p style={{ fontSize: 13, color: "#8A7C85" }}>За выбранный месяц в ревизии продаж пока нет чеков.</p>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
                  <thead>
                    <tr>
                      {["Чек №", "Дата", "Товар", "Кол-во", "Сумма, ₸"].map((h) => (
                        <th key={h} style={thStyle}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyReport.rows.map((row) => (
                      <tr key={row.id}>
                        <td style={tdStyle}>№{row.receiptNo}</td>
                        <td style={tdStyle}>{row.date}</td>
                        <td style={tdStyle}>{row.name}</td>
                        <td style={tdStyle}>{row.qty}</td>
                        <td style={tdStyle}>{fmt(row.qty * row.price)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <p style={{ fontSize: 11.5, color: "#9C8E96", marginTop: 16 }}>
              Сформировано автоматически на основании чеков кассовой программы · {new Date().toLocaleDateString("ru-RU")}
            </p>
          </div>
        </div>

        <div style={{ background: "#FFFFFF", border: "1px solid #EFE6DF", borderRadius: 14, padding: "20px 22px", marginTop: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <Contact {...iconProps} />
            <h3 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 19, color: "#2E2430", margin: 0 }}>База клиентов и программа лояльности</h3>
          </div>
          <p style={{ fontSize: 13, color: "#8A7C85", margin: "0 0 16px 0" }}>
            Заносите покупателей сюда — программа сама определяет, кто уже стал постоянным клиентом и какая скидка ему положена.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 24, marginBottom: 18 }}>
            <div style={{ minWidth: 220 }}>
              <Stepper label="Покупок для статуса «постоянный клиент»" value={loyaltyThreshold} onChange={setLoyaltyThreshold} step={1} min={2} max={20} suffix=" покупки" />
            </div>
            <div style={{ minWidth: 220 }}>
              <Slider label="Скидка постоянным клиентам" value={loyaltyDiscount} onChange={setLoyaltyDiscount} min={0} max={30} step={1} />
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "flex-end", marginBottom: 8 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: "1 1 160px" }}>
              <label style={labelStyle}>Имя клиента</label>
              <input type="text" placeholder="Например, Айгерим" value={newClient.name} onChange={(e) => setNewClient((s) => ({ ...s, name: e.target.value }))} style={inputStyle} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: "1 1 140px" }}>
              <label style={labelStyle}>Телефон</label>
              <input type="tel" placeholder="+7 7__ ___ __ __" value={newClient.phone} onChange={(e) => setNewClient((s) => ({ ...s, phone: e.target.value }))} style={inputStyle} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={labelStyle}>Покупок</label>
              <input type="number" min="0" value={newClient.purchasesCount} onChange={(e) => setNewClient((s) => ({ ...s, purchasesCount: Number(e.target.value) }))} style={{ ...inputStyle, width: 80 }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={labelStyle}>Сумма покупок, ₸</label>
              <input type="number" min="0" step="1000" value={newClient.totalSpent} onChange={(e) => setNewClient((s) => ({ ...s, totalSpent: Number(e.target.value) }))} style={{ ...inputStyle, width: 120 }} />
            </div>
            <button onClick={addClient} style={addBtnStyle}>
              <Plus size={15} /> Добавить
            </button>
          </div>
          {clientError && <p style={{ fontSize: 12.5, color: "#B23B3B", margin: "0 0 12px 0" }}>{clientError}</p>}

          {clients.length === 0 ? (
            <p style={{ fontSize: 13.5, color: "#8A7C85", padding: "16px 0" }}>База пока пуста — добавьте первого клиента.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
                <thead>
                  <tr>
                    {["Клиент", "Телефон", "Покупок", "Сумма покупок, ₸", "Статус", "Скидка", ""].map((h) => (
                      <th key={h} style={thStyle}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {clients.map((c) => (
                    <tr key={c.id}>
                      <td style={tdStyle}>{c.name}</td>
                      <td style={tdStyle}>{c.phone}</td>
                      <td style={tdStyle}>{c.purchasesCount}</td>
                      <td style={tdStyle}>{fmt(c.totalSpent)}</td>
                      <td style={tdStyle}>
                        <span style={{
                          fontSize: 12, padding: "2px 9px", borderRadius: 6,
                          color: isLoyal(c) ? "#3B6D11" : "#6B5D68",
                          background: isLoyal(c) ? "#EAF3DE" : "#F1EFE8",
                        }}>
                          {isLoyal(c) ? "постоянный" : "обычный"}
                        </span>
                      </td>
                      <td style={tdStyle}>{isLoyal(c) ? `${loyaltyDiscount}%` : "—"}</td>
                      <td style={{ ...tdStyle, textAlign: "right" }}>
                        <button onClick={() => removeClient(c.id)} aria-label="удалить клиента" style={{ ...btnStyle, borderRadius: 6, width: 26, height: 26 }}>
                          <Trash2 size={13} color="#B23B3B" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 16 }}>
            <div style={summaryChip}>Всего клиентов: <b>{fmt(clients.length)}</b></div>
            <div style={{ ...summaryChip, display: "flex", alignItems: "center", gap: 6 }}>
              <BadgePercent size={14} /> Постоянных: <b>{fmt(loyalClientsCount)}</b> — скидка {loyaltyDiscount}%
            </div>
          </div>
        </div>

        <div style={{ background: "#FFFFFF", border: "1px solid #EFE6DF", borderRadius: 14, padding: "20px 22px", marginTop: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <AlertTriangle {...iconProps} />
            <h3 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 19, color: "#2E2430", margin: 0 }}>Риски банкротства</h3>
          </div>
          <p style={{ fontSize: 13, color: "#8A7C85", margin: "0 0 16px 0" }}>
            Расчёт точки безубыточности показывает, при каком потоке покупателей бутик перестаёт быть убыточным.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 20 }}>
            <div style={riskMetricCard}>
              <p style={riskMetricLabel}>Точка безубыточности</p>
              <p style={riskMetricValue}>
                {Number.isFinite(calc.breakevenVisitors) ? `≈ ${Math.ceil(calc.breakevenVisitors)} чел/день` : "не достижима"}
              </p>
              <p style={riskMetricSub}>
                при выручке {Number.isFinite(calc.breakevenRevenue) ? `${fmt(calc.breakevenRevenue)} ₸/мес` : "—"}
              </p>
            </div>
            <div style={riskMetricCard}>
              <p style={riskMetricLabel}>Запас прочности</p>
              <p style={{ ...riskMetricValue, color: calc.marginOfSafety >= 0 ? "#3B6D11" : "#B23B3B" }}>
                {calc.marginOfSafety >= 0 ? "+" : ""}{calc.marginOfSafety.toFixed(0)}%
              </p>
              <p style={riskMetricSub}>
                от заданной минимальной посещаемости до точки безубыточности
              </p>
            </div>
            <div style={riskMetricCard}>
              <p style={riskMetricLabel}>Запас по вложениям</p>
              <p style={{ ...riskMetricValue, color: calc.runwayMonths ? "#B23B3B" : "#2E2430" }}>
                {calc.runwayMonths ? `≈ ${Math.ceil(calc.runwayMonths)} мес` : "убытка нет"}
              </p>
              <p style={riskMetricSub}>
                {calc.runwayMonths ? "на сколько хватит начальных вложений при текущем убытке" : "бутик выходит в плюс при заданных параметрах"}
              </p>
            </div>
          </div>

          {calc.marginOfSafety < 0 && (
            <div style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 12.5, color: "#791F1F", background: "#FCEBEB", borderRadius: 10, padding: "12px 14px", marginBottom: 20 }}>
              <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
              <span>Заданный минимум посетителей ниже точки безубыточности — при таких вводных бутик системно убыточен и риск банкротства высокий. Повышайте конверсию, средний чек или сокращайте постоянные расходы.</span>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 8 }}>
            {bankruptcyRisks.map((r) => (
              <div key={r.title} style={{ display: "flex", gap: 12, padding: "10px 12px", borderRadius: 10, background: "#FBF7F4", border: "1px solid #EFE6DF" }}>
                <span style={{
                  fontSize: 11, fontWeight: 500, color: riskColor[r.severity], background: "#FFFFFF",
                  border: `1px solid ${riskColor[r.severity]}`, borderRadius: 6, padding: "2px 8px",
                  height: "fit-content", whiteSpace: "nowrap",
                }}>{riskLabel[r.severity]}</span>
                <span>
                  <span style={{ fontSize: 14, color: "#2E2430" }}>{r.title}</span>
                  <p style={{ fontSize: 12.5, color: "#8A7C85", margin: "2px 0 0 0" }}>{r.desc}</p>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 760px) {
          .boutique-grid { grid-template-columns: 1.5fr 1fr !important; gap: 24px !important; }
        }
        @media print {
          .hide-on-print { display: none !important; }
          body * { visibility: hidden; }
          .tax-report-print, .tax-report-print * { visibility: visible; }
          .tax-report-print { position: absolute; top: 0; left: 0; width: 100%; border: none !important; }
        }
      `}</style>
    </div>
  );
}

const resultRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: 13.5,
  color: "#7A3B54",
  background: "#FBF2F0",
  borderRadius: 8,
  padding: "8px 12px",
  marginTop: 8,
};

const gridResponsive = { display: "grid", gridTemplateColumns: "1fr", gap: 0 };

const labelStyle = { fontSize: 11.5, color: "#8A7C85" };

const inputStyle = {
  height: 34,
  borderRadius: 8,
  border: "1px solid #D8B9C4",
  padding: "0 10px",
  fontSize: 13.5,
  color: "#2E2430",
  background: "#FFFFFF",
};

const addBtnStyle = {
  height: 34,
  borderRadius: 8,
  border: "none",
  background: "#7A3B54",
  color: "#FFFFFF",
  padding: "0 14px",
  fontSize: 13.5,
  display: "flex",
  alignItems: "center",
  gap: 6,
  cursor: "pointer",
};

const thStyle = {
  textAlign: "left",
  padding: "8px 10px",
  color: "#8A7C85",
  fontWeight: 400,
  borderBottom: "1px solid #E7DDD6",
};

const tdStyle = {
  padding: "8px 10px",
  borderBottom: "1px solid #F1EAE5",
  color: "#2E2430",
};

const summaryChip = {
  fontSize: 13,
  color: "#7A3B54",
  background: "#FBF2F0",
  borderRadius: 8,
  padding: "8px 14px",
};

const docRowLabel = {
  padding: "7px 0",
  color: "#6B5D68",
  borderBottom: "1px solid #F1EAE5",
};

const docRowValue = {
  padding: "7px 0",
  color: "#2E2430",
  textAlign: "right",
  borderBottom: "1px solid #F1EAE5",
};

const riskMetricCard = {
  background: "#FBF7F4",
  border: "1px solid #EFE6DF",
  borderRadius: 10,
  padding: "12px 14px",
};

const riskMetricLabel = { fontSize: 12, color: "#8A7C85", margin: "0 0 4px 0" };
const riskMetricValue = { fontFamily: "Georgia, serif", fontSize: 19, margin: 0, color: "#2E2430" };
const riskMetricSub = { fontSize: 11.5, color: "#9C8E96", margin: "4px 0 0 0" };
