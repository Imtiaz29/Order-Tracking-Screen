import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowLeft, ChevronRight, CircleAlert, CircleCheck, Clock3, Headphones, MapPin, MessageCircle, Package, RefreshCw, Search, Truck } from 'lucide-react';
import './styles.css';

const product = { name: 'Everyday Runner Sneakers', variant: 'Black / Size 42', qty: 1, price: '$79.00', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80' };

const states = {
  delayed: {
    eyebrow: 'Delivery delayed', title: 'Your order is running late', message: 'We’re sorry about the delay. Your package is still moving and we’ll keep you updated.', eta: 'Tomorrow, by 8:00 PM', etaLabel: 'New estimated delivery', accent: 'amber', active: 2,
    action: 'Report a delivery issue', actionIcon: CircleAlert
  },
  missing: {
    eyebrow: 'Delivered', title: 'Package says delivered', message: 'Our carrier marked this order as delivered, but you can tell us if you haven’t received it.', eta: 'Delivered today, 2:14 PM', etaLabel: 'Delivery update', accent: 'rose', active: 3,
    action: 'Report missing package', actionIcon: CircleAlert
  },
  unavailable: {
    eyebrow: 'Tracking not available', title: 'We’re getting your order ready', message: 'Tracking will appear as soon as the carrier receives your package. You don’t need to do anything yet.', eta: 'Friday, Sep 30', etaLabel: 'Estimated delivery', accent: 'blue', active: 0,
    action: 'Contact support', actionIcon: Headphones
  }
};

const timeline = [
  ['Order placed', 'Sep 24 · 10:42 AM', Package],
  ['Shipped', 'Sep 25 · 6:18 AM', Truck],
  ['Out for delivery', 'Today · 8:05 AM', MapPin],
  ['Delivered', 'Today · 2:14 PM', CircleCheck]
];

function App() {
  const [mode, setMode] = useState('delayed');
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState(false);
  const current = states[mode];

  const refresh = () => {
    setLoading(true); setError(false); setNotice('');
    setTimeout(() => setLoading(false), 800);
  };

  const submitAction = () => {
    setNotice(mode === 'missing' ? 'Support request started. We’ll help locate your package.' : mode === 'delayed' ? 'Delivery issue saved. Support will review the latest carrier update.' : 'Support is ready to help with your order.');
  };

  return <div className="app-shell">
    <header className="topbar"><button className="icon-btn" aria-label="Go back"><ArrowLeft size={19}/></button><div><p className="top-label">Orders</p><h1>Track order</h1></div><button className="icon-btn" onClick={refresh} aria-label="Refresh tracking"><RefreshCw size={18}/></button></header>

    <main className="page">
      <section className="state-switcher" aria-label="Demo delivery states">
        <span>Preview state</span>
        <div className="segmented">{Object.keys(states).map(key => <button key={key} className={mode === key ? 'selected' : ''} onClick={() => {setMode(key);setNotice('')}}>{key === 'delayed' ? 'Delayed' : key === 'missing' ? 'Not received' : 'No tracking'}</button>)}</div>
      </section>

      {error ? <section className="state-card error-card"><CircleAlert/><h2>We couldn’t load tracking</h2><p>Check your connection and try again. Your order is still safe.</p><button className="primary" onClick={refresh}>Try again</button></section> : loading ? <LoadingState/> : <>
        <section className={`hero-card ${current.accent}`}>
          <div className="hero-icon">{mode === 'unavailable' ? <Clock3/> : mode === 'missing' ? <CircleCheck/> : <CircleAlert/>}</div>
          <div className="hero-copy"><span className="eyebrow">{current.eyebrow}</span><h2>{current.title}</h2><p>{current.message}</p></div>
          <div className="eta"><div><span>{current.etaLabel}</span><strong>{current.eta}</strong></div><Clock3 size={19}/></div>
          <button className="primary hero-action" onClick={submitAction}>{React.createElement(current.actionIcon,{size:17})}{current.action}</button>
        </section>

        {mode !== 'unavailable' ? <section className="card timeline-card"><div className="section-head"><div><span className="muted">Order status</span><h3>{mode === 'missing' ? 'Delivered' : 'In transit'}</h3></div><span className={`status-pill ${current.accent}`}>{mode === 'missing' ? 'Delivered' : 'Delayed'}</span></div><div className="timeline">{timeline.map(([label,date,Icon],i) => {const done=i <= current.active; const active=i===current.active; return <div className={`step ${done?'done':''} ${active?'active':''}`} key={label}><div className="step-marker"><Icon size={14}/></div>{i<timeline.length-1 && <div className="connector"/>}<div className="step-copy"><strong>{label}</strong><span>{date}</span>{active && <small>{mode==='delayed'?'Carrier delay detected':mode==='missing'?'Marked delivered — not received':'Current location'}</small>}</div></div>})}</div></section> : <section className="card tracking-card"><div className="tracking-illustration"><Search size={22}/></div><div><h3>Tracking will appear here</h3><p>We’ll show carrier scans and movement once the package is handed over.</p></div></section>}

        <section className="card product-card"><div className="section-head"><div><span className="muted">Order summary</span><h3>#ORD-28491</h3></div><button className="text-btn">View details <ChevronRight size={15}/></button></div><div className="product-row"><img src={product.image} alt="Everyday Runner Sneakers"/><div className="product-info"><strong>{product.name}</strong><span>{product.variant}</span><span>Qty {product.qty} · {product.price}</span></div></div></section>

        <section className="support-card"><div className="support-icon"><Headphones size={19}/></div><div><strong>Need help?</strong><p>Our support team can help with delivery questions.</p></div><button className="icon-btn light" onClick={submitAction} aria-label="Contact support"><MessageCircle size={18}/></button></section>
        {notice && <div className="toast" role="status"><CircleCheck size={17}/>{notice}</div>}
      </>}
    </main>
    <nav className="bottom-nav"><button><Package size={19}/><span>Orders</span></button><button><Search size={19}/><span>Browse</span></button><button><Headphones size={19}/><span>Support</span></button></nav>
  </div>
}

function LoadingState(){return <><section className="skeleton hero-skeleton"><div className="sk circle"/><div className="sk line w40"/><div className="sk line w75"/><div className="sk line w90"/><div className="sk block"/></section><section className="card skeleton-card"><div className="sk line w30"/><div className="sk line w55"/><div className="sk line w85"/><div className="sk line w70"/></section></>}

createRoot(document.getElementById('root')).render(<App/>);
