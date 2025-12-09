import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import {
  BookOpen, Coffee, ChevronRight, ChevronDown, CheckCircle,
  Wind, Mountain, Droplets, Feather, Menu, X, Search,
  Edit3, Bookmark, Moon, Sun, Download, Upload, Settings
} from 'lucide-react';



// 金刚经数据 - 共32分（品）
import dataJson from './data.json';
const FULL_32_CHAPTERS = dataJson;

// ==========================================
// 核心配置
// ==========================================

const TOTAL_DAYS = 32; // 32分，每天1分
const CHAPTERS_PER_DAY = 1;

const getChaptersForDay = (day) => {
  const start = (day - 1) * CHAPTERS_PER_DAY + 1;
  let end = start + CHAPTERS_PER_DAY - 1;
  if (day === TOTAL_DAYS) end = 32;
  return { start, end };
};

const getPhaseForDay = (day) => {
  if (day <= 8) return "第一阶段：般若之门 (破相显性)";
  if (day <= 16) return "第二阶段：无住生心 (离相修行)";
  if (day <= 24) return "第三阶段：应无所住 (究竟空义)";
  return "第四阶段：金刚智慧 (圆满实相)";
};

const getThemeForDay = (day) => {
  const themes = {
    1: "法会因由分", 2: "善现启请分", 3: "大乘正宗分", 4: "妙行无住分",
    5: "如理实见分", 6: "正信希有分", 7: "无得无说分", 8: "依法出生分",
    9: "一相无相分", 10: "庄严净土分", 11: "无为福胜分", 12: "尊重正教分",
    13: "如法受持分", 14: "离相寂灭分", 15: "持经功德分", 16: "能净业障分",
    17: "究竟无我分", 18: "一体同观分", 19: "法界通化分", 20: "离色离相分",
    21: "非说所说分", 22: "无法可得分", 23: "净心行善分", 24: "福智无比分",
    25: "化无所化分", 26: "法身非相分", 27: "无断无灭分", 28: "不受不贪分",
    29: "威仪寂静分", 30: "一合理相分", 31: "知见不生分", 32: "应化非真分"
  };
  return themes[day] || `第 ${day} 分`;
};

// ==========================================
// 组件逻辑
// ==========================================

// ChapterCard 组件
function ChapterCard({ chapter, darkMode, onNoteSaved }) {
  const [note, setNote] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const savedNote = localStorage.getItem(`note_${chapter.id}`);
    if (savedNote) setNote(savedNote);
  }, [chapter.id]);

  const saveNote = () => {
    setIsSaving(true);
    localStorage.setItem(`note_${chapter.id}`, note);
    setTimeout(() => {
      setIsSaving(false);
      // 保存笔记后自动标记完成
      if (onNoteSaved) {
        onNoteSaved();
      }
    }, 500);
  };

  return (
    <div className={`border rounded-2xl overflow-hidden shadow-md ${darkMode ? 'bg-stone-900/40 border-stone-800' : 'bg-white border-stone-200'}`}>
      <div className={`p-4 sm:p-6`}>
        <div className="space-y-6">
          <Section title="🪷 经文原文" content={chapter.original} darkMode={darkMode} />
          <Section title="📖 白话今译" content={chapter.translation} darkMode={darkMode} />
          <Section title="💡 心法解读" content={chapter.interpretation} darkMode={darkMode} highlight />
          <Section title="🎯 现代案例" content={chapter.caseStudy} darkMode={darkMode} highlight />

          <div className={`pt-4 border-t ${darkMode ? 'border-stone-800' : 'border-stone-100'}`}>
            <div className="flex items-center gap-2 mb-3">
              <Edit3 size={18} className={darkMode ? 'text-emerald-400' : 'text-emerald-600'} />
              <span className={`text-xl font-bold ${darkMode ? 'text-stone-300' : 'text-stone-700'}`}>我的笔记</span>
            </div>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="写下你的感悟..."
              className={`w-full p-4 rounded-xl border resize-none focus:outline-none focus:ring-2 transition-all text-lg ${darkMode ? 'bg-stone-900/60 border-stone-700 text-stone-200 placeholder-stone-600 focus:ring-emerald-500/30' : 'bg-stone-50 border-stone-200 text-stone-800 placeholder-stone-400 focus:ring-emerald-500/50'}`}
              rows={3}
            />
            <div className="flex justify-end mt-3">
              <button onClick={saveNote} disabled={isSaving} className={`px-4 py-2 rounded-lg text-base font-medium transition-all ${isSaving ? 'bg-emerald-600 text-white' : darkMode ? 'bg-emerald-500 hover:bg-emerald-400 text-white' : 'bg-emerald-500 hover:bg-emerald-400 text-white'}`}>
                {isSaving ? '✓ 已保存' : '保存笔记'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Section 组件
function Section({ title, content, darkMode, highlight }) {
  // 现在JSON中已经是「」符号，直接显示即可
  const formatContent = (text) => {
    return text;  // 直接返回，因为JSON中已经是正确的符号
  };

  return (
    <div className="space-y-3 pt-4">
      <h4 className={`text-xl font-bold flex items-center gap-2 ${darkMode ? 'text-stone-400' : 'text-stone-600'}`}>{title}</h4>
      <div className={`p-3 sm:p-4 rounded-xl leading-relaxed whitespace-pre-wrap text-lg ${highlight ? (darkMode ? 'bg-emerald-950/30 text-emerald-100/90 border border-emerald-900/30' : 'bg-emerald-50/80 text-emerald-900 border border-emerald-200/50') : (darkMode ? 'bg-stone-900/40 text-stone-300' : 'bg-stone-50 text-stone-700')}`}>
        {formatContent(content)}
      </div>
    </div>
  );
}

// 主应用组件
export default function App() {
  const [currentDay, setCurrentDay] = useState(1);
  const [completedDays, setCompletedDays] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState('day');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const fileInputRef = useRef(null);

  const isInitialMount = useRef(true);

  useEffect(() => {
    const saved = localStorage.getItem('completedDays');
    if (saved) setCompletedDays(JSON.parse(saved));
    const savedBookmarks = localStorage.getItem('bookmarks');
    if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) setDarkMode(JSON.parse(savedDarkMode));

    // 恢复上次浏览的天数，或跳转到下一个未完成的天数
    const savedCurrentDay = localStorage.getItem('currentDay');
    if (savedCurrentDay) {
      setCurrentDay(parseInt(savedCurrentDay));
    } else if (saved) {
      // 如果没有保存当前天数，但有已完成的天数，跳转到下一个未完成的
      const completed = JSON.parse(saved);
      if (completed.length > 0) {
        // 找到最小的未完成天数
        let nextDay = 1;
        for (let i = 1; i <= TOTAL_DAYS; i++) {
          if (!completed.includes(i)) {
            nextDay = i;
            break;
          }
        }
        // 如果所有天都完成了，跳到最后一天
        if (nextDay === 1 && completed.includes(1)) {
          nextDay = TOTAL_DAYS;
        }
        setCurrentDay(nextDay);
      }
    }
  }, []);

  // 保存当前天数到localStorage（但不在初始加载时保存）
  // 同时自动标记为已完成
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      localStorage.setItem('currentDay', currentDay.toString());
      // 浏览即标记为已完成
      if (!completedDays.includes(currentDay)) {
        const newCompleted = [...completedDays, currentDay];
        setCompletedDays(newCompleted);
        localStorage.setItem('completedDays', JSON.stringify(newCompleted));
      }
    }
  }, [currentDay, completedDays]);

  const toggleComplete = (day) => {
    const newCompleted = completedDays.includes(day) ? completedDays.filter(d => d !== day) : [...completedDays, day];
    setCompletedDays(newCompleted);
    localStorage.setItem('completedDays', JSON.stringify(newCompleted));
  };

  const toggleBookmark = (id) => {
    const newBookmarks = bookmarks.includes(id) ? bookmarks.filter(b => b !== id) : [...bookmarks, id];
    setBookmarks(newBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  const currentChapters = useMemo(() => {
    if (viewMode === 'bookmarks') return FULL_32_CHAPTERS.filter(ch => bookmarks.includes(ch.id));
    if (viewMode === 'search' && searchQuery) return FULL_32_CHAPTERS.filter(ch => JSON.stringify(ch).toLowerCase().includes(searchQuery.toLowerCase()));
    const { start, end } = getChaptersForDay(currentDay);
    return FULL_32_CHAPTERS.filter(ch => ch.id >= start && ch.id <= end);
  }, [currentDay, viewMode, bookmarks, searchQuery]);

  const currentPhase = getPhaseForDay(currentDay);
  const currentTheme = getThemeForDay(currentDay);

  const exportData = () => {
    const data = { completedDays, bookmarks, notes: {} };
    FULL_32_CHAPTERS.forEach(ch => {
      const note = localStorage.getItem(`note_${ch.id}`);
      if (note) data.notes[ch.id] = note;
    });
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jingang-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const importData = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (data.completedDays) { setCompletedDays(data.completedDays); localStorage.setItem('completedDays', JSON.stringify(data.completedDays)); }
        if (data.bookmarks) { setBookmarks(data.bookmarks); localStorage.setItem('bookmarks', JSON.stringify(data.bookmarks)); }
        if (data.notes) { Object.entries(data.notes).forEach(([id, note]) => localStorage.setItem(`note_${id}`, note)); }
        alert('数据恢复成功！');
      } catch (err) { alert('文件格式错误，恢复失败'); }
    };
    reader.readAsText(file);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-stone-950 text-stone-100' : 'bg-gradient-to-br from-stone-50 via-white to-stone-50 text-stone-900'}`}>
      {/* 顶部导航 */}
      <nav className={`backdrop-blur-md border-b ${darkMode ? 'bg-stone-950/80 border-stone-800' : 'bg-white/80 border-stone-200'}`}>
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden">
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <BookOpen className={darkMode ? 'text-emerald-400' : 'text-emerald-600'} size={28} />
              <div>
                <h1 className={`font-serif text-xl font-bold ${darkMode ? 'text-stone-100' : 'text-stone-800'}`}>金刚经每日一分</h1>
                <p className={`text-xs ${darkMode ? 'text-stone-500' : 'text-stone-500'}`}>Diamond Sutra Daily</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => setShowSettings(!showSettings)} className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-stone-800' : 'hover:bg-stone-100'}`}>
                <Settings size={20} />
              </button>
              <button onClick={toggleDarkMode} className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-stone-800' : 'hover:bg-stone-100'}`}>
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-6 sm:py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* 侧边栏 */}
          <aside className={`lg:col-span-3 mb-8 lg:mb-0 ${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
            <div className={`sticky top-20 sm:top-24 rounded-2xl p-4 sm:p-6 border ${darkMode ? 'bg-stone-900/40 border-stone-800' : 'bg-white border-stone-200'}`}>
              <div className="mb-6">
                <label className={`block text-sm font-bold mb-3 ${darkMode ? 'text-stone-400' : 'text-stone-600'}`}>
                  <Search size={16} className="inline mr-2" />搜索经文
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); if (e.target.value) setViewMode('search'); }}
                  placeholder="关键词..."
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${darkMode ? 'bg-stone-900/60 border-stone-700 text-stone-200 placeholder-stone-600 focus:ring-emerald-500/30' : 'bg-stone-50 border-stone-200 text-stone-800 placeholder-stone-400 focus:ring-emerald-500/50'}`}
                />
              </div>

              <div className="space-y-2">
                <button onClick={() => { setViewMode('day'); setSearchQuery(''); if (window.innerWidth < 1024) setSidebarOpen(false); }} className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${viewMode === 'day' ? (darkMode ? 'bg-emerald-900/30 text-emerald-400' : 'bg-emerald-100 text-emerald-800') : (darkMode ? 'hover:bg-stone-800 text-stone-400' : 'hover:bg-stone-100 text-stone-600')}`}>
                  <Coffee size={18} />
                  <span className="font-medium">每日一分</span>
                </button>
                <button onClick={() => { setViewMode('bookmarks'); setSearchQuery(''); if (window.innerWidth < 1024) setSidebarOpen(false); }} className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${viewMode === 'bookmarks' ? (darkMode ? 'bg-emerald-900/30 text-emerald-400' : 'bg-emerald-100 text-emerald-800') : (darkMode ? 'hover:bg-stone-800 text-stone-400' : 'hover:bg-stone-100 text-stone-600')}`}>
                  <Bookmark size={18} />
                  <span className="font-medium">我的收藏</span>
                  <span className={`ml-auto px-2 py-0.5 rounded-full text-xs ${darkMode ? 'bg-stone-800' : 'bg-stone-200'}`}>{bookmarks.length}</span>
                </button>
              </div>

              {viewMode === 'day' && (
                <div className="mt-8">
                  <h3 className={`text-sm font-bold mb-4 ${darkMode ? 'text-stone-400' : 'text-stone-600'}`}>选择天数</h3>
                  <div className="grid grid-cols-8 gap-1.5">
                    {Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1).map(day => (
                      <button key={day} onClick={() => { setCurrentDay(day); if (window.innerWidth < 1024) setSidebarOpen(false); }} className={`aspect-square rounded-md text-xs font-medium transition-all min-h-[32px] ${currentDay === day ? (darkMode ? 'bg-emerald-600 text-white' : 'bg-emerald-600 text-white') : completedDays.includes(day) ? (darkMode ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-800' : 'bg-emerald-100 text-emerald-800 border border-emerald-200') : (darkMode ? 'bg-stone-800 text-stone-400 hover:bg-stone-700' : 'bg-stone-100 text-stone-600 hover:bg-stone-200')}`}>
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* 主内容 */}
          <main
            className="lg:col-span-9 pb-16 lg:pb-8"
          >
            {showSettings && (
              <div className={`mb-8 p-6 rounded-2xl border ${darkMode ? 'bg-stone-900/40 border-stone-800' : 'bg-white border-stone-200'}`}>
                <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-stone-200' : 'text-stone-800'}`}>数据管理</h3>
                <div className="flex flex-wrap gap-3">
                  <button onClick={exportData} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${darkMode ? 'bg-stone-800 hover:bg-stone-700 text-stone-300' : 'bg-stone-100 hover:bg-stone-200 text-stone-700'}`}>
                    <Download size={18} /> 导出备份
                  </button>
                  <input ref={fileInputRef} type="file" accept=".json" onChange={importData} className="hidden" />
                  <button onClick={() => fileInputRef.current?.click()} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${darkMode ? 'bg-stone-800 hover:bg-stone-700 text-stone-300' : 'bg-stone-100 hover:bg-stone-200 text-stone-700'}`}>
                    <Upload size={18} /> 选择备份文件恢复
                  </button>
                </div>
              </div>
            )}

            {viewMode === 'day' && (
              <>
                <div className="mb-6 animate-in slide-in-from-bottom-4 duration-500">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex gap-4 text-xs font-bold uppercase tracking-widest opacity-40">
                      <span>Day {currentDay} / {TOTAL_DAYS}</span>
                      <span>{Math.round((completedDays.length / TOTAL_DAYS) * 100)}%</span>
                    </div>
                    {currentChapters[0] && (
                      <button
                        onClick={() => toggleBookmark(currentChapters[0].id)}
                        className={`transition-colors flex-shrink-0 ${bookmarks.includes(currentChapters[0].id) ? 'text-amber-500' : darkMode ? 'text-stone-600 hover:text-amber-500' : 'text-stone-400 hover:text-amber-500'}`}
                        aria-label="收藏"
                      >
                        <Bookmark size={24} fill={bookmarks.includes(currentChapters[0].id) ? 'currentColor' : 'none'} />
                      </button>
                    )}
                  </div>
                  <div className="w-full bg-stone-200/20 rounded-full h-1.5 mb-4 overflow-hidden">
                    <div className="bg-emerald-600 h-full transition-all duration-500" style={{ width: `${(completedDays.length / TOTAL_DAYS) * 100}%` }} />
                  </div>

                  {/* 阶段标题居中 */}
                  <div className="text-center mb-2">
                    <span className={`inline-block px-4 py-1.5 text-base font-bold rounded-full ${darkMode ? 'bg-emerald-900/30 text-emerald-400' : 'bg-emerald-100 text-emerald-800'}`}>
                      {currentPhase}
                    </span>
                  </div>

                  {/* 标题和箭头 */}
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <button
                      onClick={() => setCurrentDay(Math.max(1, currentDay - 1))}
                      disabled={currentDay === 1}
                      className={`p-2 rounded-full transition-all flex-shrink-0 ${currentDay === 1 ? 'opacity-20 cursor-not-allowed' : darkMode ? 'hover:bg-stone-800 text-stone-400 hover:text-emerald-400' : 'hover:bg-stone-100 text-stone-500 hover:text-emerald-600'}`}
                      aria-label="上一分"
                    >
                      <ChevronRight className="rotate-180" size={28} />
                    </button>

                    <h2 className={`font-serif text-2xl md:text-4xl font-bold text-center ${darkMode ? 'text-stone-100' : 'text-stone-800'}`}>
                      {currentChapters[0]?.title || currentTheme}
                    </h2>

                    <button
                      onClick={() => setCurrentDay(Math.min(TOTAL_DAYS, currentDay + 1))}
                      disabled={currentDay === TOTAL_DAYS}
                      className={`p-2 rounded-full transition-all flex-shrink-0 ${currentDay === TOTAL_DAYS ? 'opacity-20 cursor-not-allowed' : darkMode ? 'hover:bg-stone-800 text-stone-400 hover:text-emerald-400' : 'hover:bg-stone-100 text-stone-500 hover:text-emerald-600'}`}
                      aria-label="下一分"
                    >
                      <ChevronRight size={28} />
                    </button>
                  </div>

                </div>

                {currentChapters.length > 0 ? (
                  <div className="space-y-6">
                    {currentChapters.map(ch => (
                      <ChapterCard
                        key={ch.id}
                        chapter={ch}
                        darkMode={darkMode}
                        onNoteSaved={() => {
                          if (!completedDays.includes(currentDay)) {
                            toggleComplete(currentDay);
                          }
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 border-2 border-dashed border-stone-200 rounded-xl">
                    <p className="text-stone-400">暂无内容</p>
                  </div>
                )}

                {/* 主要的下一分按钮 */}
                {currentDay < TOTAL_DAYS && (
                  <div className="mt-8">
                    <button
                      onClick={() => {
                        setCurrentDay(currentDay + 1);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`w-full flex items-center justify-center gap-2 px-6 sm:px-8 py-4 sm:py-5 rounded-xl font-bold text-lg sm:text-xl transition-all ${darkMode ? 'bg-emerald-950/30 text-emerald-100/90 border border-emerald-900/30 hover:bg-emerald-950/40' : 'bg-emerald-50/80 text-emerald-900 border border-emerald-200/50 hover:bg-emerald-50'} shadow-lg hover:shadow-xl`}
                    >
                      <span>下一分</span>
                      <ChevronRight size={24} className="sm:hidden" />
                      <ChevronRight size={28} className="hidden sm:block" />
                    </button>
                  </div>
                )}
              </>
            )}

            {viewMode === 'bookmarks' && (
              <div className="space-y-6">
                <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-stone-100' : 'text-stone-800'}`}>我的收藏 ({bookmarks.length})</h2>
                {currentChapters.map(ch => (
                  <div key={ch.id} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <h3 className={`font-serif text-xl font-bold ${darkMode ? 'text-stone-100' : 'text-stone-800'}`}>{ch.title}</h3>
                      <button
                        onClick={() => toggleBookmark(ch.id)}
                        className={`transition-colors flex-shrink-0 ${bookmarks.includes(ch.id) ? 'text-amber-500' : darkMode ? 'text-stone-600 hover:text-amber-500' : 'text-stone-400 hover:text-amber-500'}`}
                      >
                        <Bookmark size={20} fill={bookmarks.includes(ch.id) ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                    <ChapterCard chapter={ch} darkMode={darkMode} onNoteSaved={() => {}} />
                  </div>
                ))}
                {currentChapters.length === 0 && (
                  <div className="text-center py-20 border-2 border-dashed border-stone-200 rounded-xl">
                    <p className="text-stone-400">还没有收藏任何经文</p>
                  </div>
                )}
              </div>
            )}

            {viewMode === 'search' && (
              <div className="space-y-6">
                <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-stone-100' : 'text-stone-800'}`}>搜索结果 ({currentChapters.length})</h2>
                {currentChapters.map(ch => (
                  <div key={ch.id} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <h3 className={`font-serif text-xl font-bold ${darkMode ? 'text-stone-100' : 'text-stone-800'}`}>{ch.title}</h3>
                      <button
                        onClick={() => toggleBookmark(ch.id)}
                        className={`transition-colors flex-shrink-0 ${bookmarks.includes(ch.id) ? 'text-amber-500' : darkMode ? 'text-stone-600 hover:text-amber-500' : 'text-stone-400 hover:text-amber-500'}`}
                      >
                        <Bookmark size={20} fill={bookmarks.includes(ch.id) ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                    <ChapterCard chapter={ch} darkMode={darkMode} onNoteSaved={() => {}} />
                  </div>
                ))}
                {currentChapters.length === 0 && searchQuery && (
                  <div className="text-center py-20 border-2 border-dashed border-stone-200 rounded-xl">
                    <p className="text-stone-400">未找到相关内容</p>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>

    </div>
  );
}
