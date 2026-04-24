import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Initial data state
const initialTabs = [
  { key: 'orders', descKey: 'dash_orders_desc', icon: '',
    content: [
      { id: '#1247', status: 'Confirmée', client: 'Ahmed M.', agent: 'Sara', priority: 'high', amount: '3,200 DA' },
      { id: '#1246', status: 'En cours', client: 'Fatima B.', agent: 'Karim', priority: 'med', amount: '1,850 DA' },
      { id: '#1245', status: 'Livrée', client: 'Youssef T.', agent: 'Leila', priority: 'low', amount: '5,500 DA' },
      { id: '#1244', status: 'Annulée', client: 'Nour A.', agent: 'Omar', priority: 'low', amount: '900 DA' },
    ]
  },
  { key: 'stock', descKey: 'dash_stock_desc', icon: '',
    content: [
      { product: 'T-shirt Premium', stock: 142, status: 'ok', in: 50, out: 12 },
      { product: 'Pantalon Slim', stock: 8, status: 'low', in: 0, out: 23 },
      { product: 'Robe Été', stock: 0, status: 'empty', in: 0, out: 45 },
      { product: 'Veste Cuir', stock: 67, status: 'ok', in: 20, out: 8 },
    ]
  },
  { key: 'clients', descKey: 'dash_clients_desc', icon: '',
    content: [
      { name: 'Ahmed M.', orders: 12, spent: '48,500 DA', loyalty: 'gold', status: 'vip' },
      { name: 'Fatima B.', orders: 5, spent: '14,200 DA', loyalty: 'silver', status: 'regular' },
      { name: 'Karim X.', orders: 1, spent: '900 DA', loyalty: 'none', status: 'blacklist' },
      { name: 'Nour A.', orders: 8, spent: '31,000 DA', loyalty: 'gold', status: 'vip' },
    ]
  },
  { key: 'team', descKey: 'dash_team_desc', icon: '',
    content: [
      { name: 'Sara K.', role: 'Agent confirm.', confirmed: 48, rate: '94%', status: 'active' },
      { name: 'Karim B.', role: 'Logistique', confirmed: 32, rate: '87%', status: 'active' },
      { name: 'Leila M.', role: 'SAV', confirmed: 21, rate: '91%', status: 'pause' },
      { name: 'Omar N.', role: 'Admin', confirmed: 0, rate: '—', status: 'admin' },
    ]
  },
  { key: 'auto', descKey: 'dash_auto_desc', icon: '',
    content: [
      { trigger: 'Commande confirmée', action: 'SMS client', status: 'active', runs: 1247 },
      { trigger: 'Retard > 24h', action: 'Alerte manager', status: 'active', runs: 34 },
      { trigger: 'Panier abandonné', action: 'Relance WhatsApp', status: 'active', runs: 89 },
      { trigger: 'Stock < 10', action: 'Alerte stock', status: 'paused', runs: 12 },
    ]
  },
  { key: 'kpi', descKey: 'dash_kpi_desc', icon: '',
    content: 'kpi'
  },
];

const statusColor = {
  'Confirmée': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  'En cours': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'Livrée': 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
  'Annulée': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};
const priorityColor = { high: 'bg-red-500', med: 'bg-amber-400', low: 'bg-slate-300 dark:bg-slate-600' };
const stockColor = { ok: 'text-emerald-500', low: 'text-amber-500', empty: 'text-red-500' };
const loyaltyColor = { gold: 'text-amber-500', silver: 'text-slate-400', none: 'text-slate-300 dark:text-slate-700' };
const clientStatusColor = { vip: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400', regular: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', blacklist: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' };

const Dashboard = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('orders');
  const [period, setPeriod] = useState('day');
  const [tabs, setTabs] = useState(initialTabs);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({});

  const currentTab = tabs.find(t => t.key === activeTab);

  // Filter content based on search query
  const getFilteredContent = () => {
    if (!currentTab?.content || currentTab.content === 'kpi') return [];
    if (!searchQuery.trim()) return currentTab.content;
    
    const query = searchQuery.toLowerCase();
    return currentTab.content.filter(item => {
      if (activeTab === 'orders') {
        return item.id?.toLowerCase().includes(query) || 
               item.client?.toLowerCase().includes(query) || 
               item.agent?.toLowerCase().includes(query) ||
               item.status?.toLowerCase().includes(query);
      }
      if (activeTab === 'stock') {
        return item.product?.toLowerCase().includes(query);
      }
      if (activeTab === 'clients') {
        return item.name?.toLowerCase().includes(query);
      }
      if (activeTab === 'team') {
        return item.name?.toLowerCase().includes(query) || 
               item.role?.toLowerCase().includes(query);
      }
      if (activeTab === 'auto') {
        return item.trigger?.toLowerCase().includes(query) || 
               item.action?.toLowerCase().includes(query);
      }
      return false;
    });
  };

  const filteredContent = getFilteredContent();

  // Add new item
  const handleAddItem = () => {
    const tabIndex = tabs.findIndex(t => t.key === activeTab);
    if (tabIndex === -1) return;

    const newTabs = [...tabs];
    let itemToAdd = { ...newItem };

    // Generate ID and set defaults based on tab
    if (activeTab === 'orders') {
      const maxId = Math.max(...newTabs[tabIndex].content.map(i => parseInt(i.id.replace('#', '')) || 0));
      itemToAdd = {
        id: `#${maxId + 1}`,
        status: 'En cours',
        client: newItem.client || 'Nouveau client',
        agent: newItem.agent || 'Agent',
        priority: 'med',
        amount: newItem.amount || '0 DA'
      };
    } else if (activeTab === 'stock') {
      itemToAdd = {
        product: newItem.product || 'Nouveau produit',
        stock: parseInt(newItem.stock) || 0,
        status: parseInt(newItem.stock) || 0 === 0 ? 'empty' : parseInt(newItem.stock) < 10 ? 'low' : 'ok',
        in: parseInt(newItem.in) || 0,
        out: parseInt(newItem.out) || 0
      };
    } else if (activeTab === 'clients') {
      itemToAdd = {
        name: newItem.name || 'Nouveau client',
        orders: parseInt(newItem.orders) || 0,
        spent: newItem.spent || '0 DA',
        loyalty: 'none',
        status: 'regular'
      };
    } else if (activeTab === 'team') {
      itemToAdd = {
        name: newItem.name || 'Nouveau membre',
        role: newItem.role || 'Rôle',
        confirmed: 0,
        rate: '0%',
        status: 'active'
      };
    } else if (activeTab === 'auto') {
      itemToAdd = {
        trigger: newItem.trigger || 'Nouveau déclencheur',
        action: newItem.action || 'Nouvelle action',
        status: 'active',
        runs: 0
      };
    }

    newTabs[tabIndex].content = [itemToAdd, ...newTabs[tabIndex].content];
    setTabs(newTabs);
    setShowAddModal(false);
    setNewItem({});
  };

  // Delete item
  const handleDeleteItem = (index) => {
    const tabIndex = tabs.findIndex(t => t.key === activeTab);
    if (tabIndex === -1) return;

    const newTabs = [...tabs];
    newTabs[tabIndex].content = newTabs[tabIndex].content.filter((_, i) => i !== index);
    setTabs(newTabs);
  };

  const kpiData = {
    day: [{ label: 'Commandes', val: '247', change: '+12%', up: true }, { label: 'CA', val: '94,500 DA', change: '+8%', up: true }, { label: 'Taux conf.', val: '91%', change: '+3%', up: true }, { label: 'Retours', val: '6', change: '-2', up: false }],
    week: [{ label: 'Commandes', val: '1,624', change: '+18%', up: true }, { label: 'CA', val: '647,200 DA', change: '+21%', up: true }, { label: 'Taux conf.', val: '89%', change: '+1%', up: true }, { label: 'Retours', val: '41', change: '-8%', up: false }],
    month: [{ label: 'Commandes', val: '6,891', change: '+24%', up: true }, { label: 'CA', val: '2.4M DA', change: '+31%', up: true }, { label: 'Taux conf.', val: '92%', change: '+4%', up: true }, { label: 'Retours', val: '157', change: '-15%', up: false }],
  };

  return (
    <section id="dashboard" className="py-24 lg:py-32 bg-slate-50 dark:bg-slate-900/50 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-full text-primary font-medium text-sm mb-6">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse-slow" />
            Démo interactive
          </div>
          <h2 className="text-3xl lg:text-5xl font-extrabold text-heading dark:text-white mb-4">{t('dash_title')}</h2>
          <p className="text-lg text-body dark:text-slate-400">Explorez chaque module du système.</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden">
          {/* Tab bar */}
          <div className="flex items-center gap-1 justify-center overflow-x-auto no-scrollbar px-4 pt-4 pb-0 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-bold rounded-t-xl whitespace-nowrap transition-all shrink-0 border-b-2 -mb-[1px] ${activeTab === tab.key ? 'border-primary text-primary bg-white dark:bg-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800/50'}`}
              >
                <span>{tab.icon}</span>
                {t(`dash_tab${tabs.indexOf(tab) + 1}`)}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="p-6 lg:p-8">
            {/* Search/filter bar */}
            {activeTab !== 'kpi' && (
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 flex items-center gap-2 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                  <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  <input 
                    type="text" 
                    placeholder={t('dash_' + activeTab + '_desc')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-sm text-body dark:text-slate-300 placeholder:text-slate-400"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-slate-600">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  )}
                </div>
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-hover transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  + Nouveau
                </button>
              </div>
            )}

            {/* Orders table */}
            {activeTab === 'orders' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left rtl:text-right">
                      <th className="text-xs font-bold text-slate-400 uppercase tracking-wider pb-3 pr-4 rtl:pr-0 rtl:pl-4">ID</th>
                      <th className="text-xs font-bold text-slate-400 uppercase tracking-wider pb-3 pr-4 rtl:pr-0 rtl:pl-4">Client</th>
                      <th className="text-xs font-bold text-slate-400 uppercase tracking-wider pb-3 pr-4 rtl:pr-0 rtl:pl-4">Agent</th>
                      <th className="text-xs font-bold text-slate-400 uppercase tracking-wider pb-3 pr-4 rtl:pr-0 rtl:pl-4">Statut</th>
                      <th className="text-xs font-bold text-slate-400 uppercase tracking-wider pb-3">Montant</th>
                      <th className="text-xs font-bold text-slate-400 uppercase tracking-wider pb-3 w-16">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                    {filteredContent.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-400">
                          <svg className="w-12 h-12 mx-auto mb-3 text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          <p>Aucune commande trouvée</p>
                        </td>
                      </tr>
                    ) : (
                      filteredContent.map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                          <td className="py-3 pr-4 rtl:pr-0 rtl:pl-4">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${priorityColor[row.priority]}`} />
                              <span className="text-sm font-mono font-bold text-heading dark:text-white">{row.id}</span>
                            </div>
                          </td>
                          <td className="py-3 pr-4 rtl:pr-0 rtl:pl-4 text-sm text-body dark:text-slate-300">{row.client}</td>
                          <td className="py-3 pr-4 rtl:pr-0 rtl:pl-4 text-sm text-body dark:text-slate-300">{row.agent}</td>
                          <td className="py-3 pr-4 rtl:pr-0 rtl:pl-4">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold ${statusColor[row.status]}`}>{row.status}</span>
                          </td>
                          <td className="py-3 text-sm font-bold text-heading dark:text-white">{row.amount}</td>
                          <td className="py-3">
                            <button 
                              onClick={() => handleDeleteItem(currentTab.content.indexOf(row))}
                              className="p-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                              title="Supprimer"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Stock */}
            {activeTab === 'stock' && (
              <div className="space-y-3">
                {filteredContent.length === 0 ? (
                  <div className="py-12 text-center text-slate-400">
                    <svg className="w-12 h-12 mx-auto mb-3 text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                    <p>Aucun produit trouvé</p>
                  </div>
                ) : (
                  filteredContent.map((row, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl group">
                      <div className="flex-1">
                        <div className="text-sm font-bold text-heading dark:text-white mb-1">{row.product}</div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full transition-all ${row.status === 'ok' ? 'bg-emerald-500' : row.status === 'low' ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${Math.min(100, (row.stock / 150) * 100)}%` }} />
                          </div>
                        </div>
                      </div>
                      <div className="text-right rtl:text-left shrink-0">
                        <div className={`text-lg font-black ${stockColor[row.status]}`}>{row.stock}</div>
                        <div className="text-xs text-slate-400">unités</div>
                      </div>
                      <div className="text-xs text-slate-400 shrink-0">
                        <div className="text-emerald-500">+{row.in}</div>
                        <div className="text-red-400">-{row.out}</div>
                      </div>
                      {row.status !== 'ok' && (
                        <div className="shrink-0">
                          <span className={`text-xs font-bold px-2 py-1 rounded-lg ${row.status === 'empty' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' : 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                            {row.status === 'empty' ? 'Épuisé' : 'Stock bas'}
                          </span>
                        </div>
                      )}
                      <button 
                        onClick={() => handleDeleteItem(currentTab.content.indexOf(row))}
                        className="p-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all shrink-0"
                        title="Supprimer"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Clients */}
            {activeTab === 'clients' && (
              <div className="space-y-3">
                {filteredContent.length === 0 ? (
                  <div className="py-12 text-center text-slate-400">
                    <svg className="w-12 h-12 mx-auto mb-3 text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    <p>Aucun client trouvé</p>
                  </div>
                ) : (
                  filteredContent.map((row, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl group">
                      <div className="w-10 h-10 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center text-sm font-black text-primary shrink-0">
                        {row.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-heading dark:text-white">{row.name}</div>
                        <div className="text-xs text-slate-400">{row.orders} commandes · {row.spent}</div>
                      </div>
                      <div className={`text-lg ${loyaltyColor[row.loyalty]}`} title={row.loyalty}>⭐</div>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${clientStatusColor[row.status]}`}>{row.status.toUpperCase()}</span>
                      <button 
                        onClick={() => handleDeleteItem(currentTab.content.indexOf(row))}
                        className="p-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all shrink-0"
                        title="Supprimer"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Team */}
            {activeTab === 'team' && (
              <div className="space-y-3">
                {filteredContent.length === 0 ? (
                  <div className="py-12 text-center text-slate-400">
                    <svg className="w-12 h-12 mx-auto mb-3 text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    <p>Aucun membre trouvé</p>
                  </div>
                ) : (
                  filteredContent.map((row, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl group">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center text-sm font-black text-white shrink-0">
                        {row.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-bold text-heading dark:text-white">{row.name}</div>
                        <div className="text-xs text-slate-400">{row.role}</div>
                      </div>
                      <div className="text-right rtl:text-left shrink-0">
                        <div className="text-sm font-black text-heading dark:text-white">{row.confirmed}</div>
                        <div className="text-xs text-slate-400">actions</div>
                      </div>
                      <div className="text-right rtl:text-left shrink-0">
                        <div className="text-sm font-bold text-emerald-500">{row.rate}</div>
                        <div className="text-xs text-slate-400">taux</div>
                      </div>
                      <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${row.status === 'active' ? 'bg-emerald-500' : row.status === 'admin' ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-600'}`} />
                      <button 
                        onClick={() => handleDeleteItem(currentTab.content.indexOf(row))}
                        className="p-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all shrink-0"
                        title="Supprimer"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Automations */}
            {activeTab === 'auto' && (
              <div className="space-y-3">
                {filteredContent.length === 0 ? (
                  <div className="py-12 text-center text-slate-400">
                    <svg className="w-12 h-12 mx-auto mb-3 text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    <p>Aucune automatisation trouvée</p>
                  </div>
                ) : (
                  filteredContent.map((row, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl group">
                      <div className="flex-1">
                        <div className="text-sm font-bold text-heading dark:text-white">{row.trigger}</div>
                        <div className="text-xs text-slate-400 mt-0.5">→ {row.action}</div>
                      </div>
                      <div className="text-right rtl:text-left shrink-0">
                        <div className="text-sm font-bold text-heading dark:text-white">{row.runs}</div>
                        <div className="text-xs text-slate-400">exéc.</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer shrink-0">
                        <input type="checkbox" defaultChecked={row.status === 'active'} className="sr-only peer" />
                        <div className="w-10 h-6 bg-slate-200 dark:bg-slate-700 peer-checked:bg-primary rounded-full peer-focus:ring-2 peer-focus:ring-primary/30 transition-colors after:content-[''] after:absolute after:top-1 after:start-1 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4 rtl:peer-checked:after:-translate-x-4" />
                      </label>
                      <button 
                        onClick={() => handleDeleteItem(currentTab.content.indexOf(row))}
                        className="p-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all shrink-0"
                        title="Supprimer"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* KPI */}
            {activeTab === 'kpi' && (
              <div>
                <div className="flex flex-col items-center justify-center gap-6">
                  <div className="flex items-center gap-2 mb-6">
                    {['day', 'week', 'month'].map(p => (
                      <button key={p} onClick={() => setPeriod(p)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${period === p ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}>
                        {p === 'day' ? "Aujourd'hui" : p === 'week' ? 'Semaine' : 'Mois'}
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl">
                    {kpiData[period].map((kpi, i) => (
                      <div key={i} className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 flex flex-col items-center">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{kpi.label}</div>
                        <div className="text-2xl font-black text-heading dark:text-white mb-1">{kpi.val}</div>
                        <div className={`text-xs font-bold ${kpi.up ? 'text-emerald-500' : 'text-red-500'}`}>{kpi.change}</div>
                      </div>
                    ))}
                  </div>
                  {/* Mini chart */}
                  <div className="mt-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 w-full max-w-5xl flex flex-col items-center">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Commandes — Tendance</div>
                    <div className="flex items-end gap-2 h-24 w-full">
                      {(period === 'day'
                        ? [30, 55, 40, 70, 85, 65, 95, 80, 90, 100, 75, 88]
                        : period === 'week'
                          ? [60, 80, 70, 90, 100, 95, 85, 90, 80, 70, 60, 75]
                          : [40, 60, 55, 70, 80, 90, 100, 95, 85, 80, 75, 60]
                      ).map((h, i) => (
                        <div key={i} className="flex-1 rounded-t-lg transition-all" style={{ height: `${h}%`, background: period === 'day' && i === 10 ? '#00a2ff' : period === 'week' && i === 4 ? '#00a2ff' : period === 'month' && i === 6 ? '#00a2ff' : '#e2e8f0' }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Add Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
            <div className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-200">
              <button 
                onClick={() => setShowAddModal(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              
              <h3 className="text-xl font-bold text-heading dark:text-white mb-6">Ajouter un élément</h3>
              
              <div className="space-y-4">
                {activeTab === 'orders' && (
                  <>
                    <div>
                      <label className="block text-sm font-bold text-slate-600 dark:text-slate-300 mb-2">Client</label>
                      <input type="text" value={newItem.client || ''} onChange={(e) => setNewItem({...newItem, client: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-body dark:text-white" placeholder="Nom du client" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-600 dark:text-slate-300 mb-2">Agent</label>
                      <input type="text" value={newItem.agent || ''} onChange={(e) => setNewItem({...newItem, agent: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-body dark:text-white" placeholder="Nom de l'agent" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-600 dark:text-slate-300 mb-2">Montant</label>
                      <input type="text" value={newItem.amount || ''} onChange={(e) => setNewItem({...newItem, amount: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-body dark:text-white" placeholder="Ex: 2,500 DA" />
                    </div>
                  </>
                )}
                {activeTab === 'stock' && (
                  <>
                    <div>
                      <label className="block text-sm font-bold text-slate-600 dark:text-slate-300 mb-2">Produit</label>
                      <input type="text" value={newItem.product || ''} onChange={(e) => setNewItem({...newItem, product: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-body dark:text-white" placeholder="Nom du produit" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-600 dark:text-slate-300 mb-2">Stock</label>
                      <input type="number" value={newItem.stock || ''} onChange={(e) => setNewItem({...newItem, stock: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-body dark:text-white" placeholder="Quantité en stock" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-600 dark:text-slate-300 mb-2">Entrée</label>
                        <input type="number" value={newItem.in || ''} onChange={(e) => setNewItem({...newItem, in: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-body dark:text-white" placeholder="0" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-600 dark:text-slate-300 mb-2">Sortie</label>
                        <input type="number" value={newItem.out || ''} onChange={(e) => setNewItem({...newItem, out: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-body dark:text-white" placeholder="0" />
                      </div>
                    </div>
                  </>
                )}
                {activeTab === 'clients' && (
                  <>
                    <div>
                      <label className="block text-sm font-bold text-slate-600 dark:text-slate-300 mb-2">Nom</label>
                      <input type="text" value={newItem.name || ''} onChange={(e) => setNewItem({...newItem, name: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-body dark:text-white" placeholder="Nom du client" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-600 dark:text-slate-300 mb-2">Commandes</label>
                      <input type="number" value={newItem.orders || ''} onChange={(e) => setNewItem({...newItem, orders: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-body dark:text-white" placeholder="0" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-600 dark:text-slate-300 mb-2">Total dépensé</label>
                      <input type="text" value={newItem.spent || ''} onChange={(e) => setNewItem({...newItem, spent: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-body dark:text-white" placeholder="Ex: 10,000 DA" />
                    </div>
                  </>
                )}
                {activeTab === 'team' && (
                  <>
                    <div>
                      <label className="block text-sm font-bold text-slate-600 dark:text-slate-300 mb-2">Nom</label>
                      <input type="text" value={newItem.name || ''} onChange={(e) => setNewItem({...newItem, name: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-body dark:text-white" placeholder="Nom du membre" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-600 dark:text-slate-300 mb-2">Rôle</label>
                      <input type="text" value={newItem.role || ''} onChange={(e) => setNewItem({...newItem, role: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-body dark:text-white" placeholder="Ex: Agent commercial" />
                    </div>
                  </>
                )}
                {activeTab === 'auto' && (
                  <>
                    <div>
                      <label className="block text-sm font-bold text-slate-600 dark:text-slate-300 mb-2">Déclencheur</label>
                      <input type="text" value={newItem.trigger || ''} onChange={(e) => setNewItem({...newItem, trigger: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-body dark:text-white" placeholder="Ex: Commande confirmée" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-600 dark:text-slate-300 mb-2">Action</label>
                      <input type="text" value={newItem.action || ''} onChange={(e) => setNewItem({...newItem, action: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-body dark:text-white" placeholder="Ex: Envoyer SMS" />
                    </div>
                  </>
                )}
              </div>
              
              <div className="flex gap-3 mt-6">
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Annuler
                </button>
                <button 
                  onClick={handleAddItem}
                  className="flex-1 px-4 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition-colors"
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
