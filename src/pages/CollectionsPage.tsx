import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Grid3X3, LayoutGrid, RotateCcw, Search } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { CategoryType } from '../types';

export const CollectionsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('cat') as CategoryType | null;

  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'all'>(
    categoryParam || 'all'
  );
  const [selectedSilhouette, setSelectedSilhouette] = useState<string>('all');
  const [selectedFabric, setSelectedFabric] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'hours-desc'>(
    'featured'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [columns, setColumns] = useState<2 | 3>(3);

  // Synchronize category param
  const handleCategoryChange = (cat: CategoryType | 'all') => {
    setSelectedCategory(cat);
    if (cat === 'all') {
      searchParams.delete('cat');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ cat });
    }
  };

  const silhouettes = useMemo(() => {
    return Array.from(new Set(PRODUCTS.map((p) => p.silhouette)));
  }, []);

  const fabrics = useMemo(() => {
    const list = ['Chantilly lace', 'silk velvet', 'silk chiffon', 'silk mikado', 'silk lamé', 'guipure lace', 'plissé', 'tulle'];
    return list;
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (selectedSilhouette !== 'all' && p.silhouette !== selectedSilhouette) return false;
      if (
        selectedFabric !== 'all' &&
        !p.fabric.toLowerCase().includes(selectedFabric.toLowerCase())
      )
        return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesSub = p.subtitle.toLowerCase().includes(q);
        const matchesFabric = p.fabric.toLowerCase().includes(q);
        if (!matchesName && !matchesSub && !matchesFabric) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'hours-desc') return b.atelierHours - a.atelierHours;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, selectedSilhouette, selectedFabric, sortBy, searchQuery]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedSilhouette('all');
    setSelectedFabric('all');
    setSearchQuery('');
    setSortBy('featured');
    searchParams.delete('cat');
    setSearchParams(searchParams);
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedSilhouette !== 'all' ||
    selectedFabric !== 'all' ||
    Boolean(searchQuery.trim());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <span className="text-xs uppercase tracking-[0.25em] text-[#8E795D] font-semibold block">
          Haute Couture Catalog
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif text-[#1A1A1A] font-normal">
          The fashionierMind Collections
        </h1>
        <p className="text-sm text-[#6B655C] leading-relaxed font-light">
          Bespoke bridal gowns, red-carpet velvet columns, and plissé resort eveningwear sculpted by hand in our Paris & New York ateliers.
        </p>
      </div>

      {/* Category Tabs (Segmented Control - Functional Buttons Allowed) */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8">
        {[
          { label: 'All Creations', val: 'all' },
          { label: 'Bridal Couture', val: 'bridal' },
          { label: 'Gala & Evening', val: 'evening' },
          { label: 'Resort & Plissé', val: 'resort' },
          { label: 'Accessories & Capes', val: 'accessories' },
        ].map((tab) => (
          <button
            key={tab.val}
            onClick={() => handleCategoryChange(tab.val as any)}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-colors rounded-sm border ${
              selectedCategory === tab.val
                ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                : 'bg-white text-[#555] border-[#DDD6CB] hover:border-[#1A1A1A] hover:text-[#1A1A1A]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-[#F5F1EB] border border-[#E0D7C9] p-4 mb-8 flex flex-wrap items-center justify-between gap-4">
        {/* Search Input within Catalog */}
        <div className="relative flex-1 min-w-[220px] max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-[#8C8273]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by gown, lace, or silhouette..."
            className="w-full bg-white border border-[#DDD6CB] pl-8 pr-3 py-1.5 text-xs text-[#1A1A1A] placeholder:text-[#999] focus:outline-none focus:border-[#8E795D]"
          />
        </div>

        {/* Controls: Silhouette, Sort, and Layout */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Silhouette dropdown */}
          <div className="flex items-center gap-1.5 text-xs text-[#6B655C]">
            <span className="hidden sm:inline uppercase text-[11px] tracking-wider">Silhouette:</span>
            <select
              value={selectedSilhouette}
              onChange={(e) => setSelectedSilhouette(e.target.value)}
              className="bg-white border border-[#DDD6CB] px-3 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8E795D] rounded-sm min-h-[38px] cursor-pointer"
            >
              <option value="all">All Silhouettes</option>
              {silhouettes.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Fabric filter */}
          <div className="flex items-center gap-1.5 text-xs text-[#6B655C]">
            <span className="hidden sm:inline uppercase text-[11px] tracking-wider">Fabric:</span>
            <select
              value={selectedFabric}
              onChange={(e) => setSelectedFabric(e.target.value)}
              className="bg-white border border-[#DDD6CB] px-3 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8E795D] rounded-sm min-h-[38px] cursor-pointer"
            >
              <option value="all">All Fabrics</option>
              {fabrics.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-1.5 text-xs text-[#6B655C]">
            <span className="hidden sm:inline uppercase text-[11px] tracking-wider">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-[#DDD6CB] px-3 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8E795D] rounded-sm min-h-[38px] cursor-pointer"
            >
              <option value="featured">Featured Runway</option>
              <option value="hours-desc">Atelier Hours (High to Low)</option>
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
            </select>
          </div>

          {/* Grid column toggle (Desktop) */}
          <div className="hidden lg:flex items-center border border-[#DDD6CB] bg-white rounded-sm p-0.5">
            <button
              onClick={() => setColumns(2)}
              aria-label="2-column editorial view"
              className={`p-1.5 rounded-sm transition-colors ${
                columns === 2 ? 'bg-[#1A1A1A] text-white' : 'text-[#8C8273] hover:text-[#1A1A1A]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setColumns(3)}
              aria-label="3-column catalog view"
              className={`p-1.5 rounded-sm transition-colors ${
                columns === 3 ? 'bg-[#1A1A1A] text-white' : 'text-[#8C8273] hover:text-[#1A1A1A]'
              }`}
            >
              <Grid3X3 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs uppercase tracking-wider text-[#8E795D] hover:underline inline-flex items-center gap-1 font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Results Header Count */}
      <div className="flex justify-between items-center text-xs text-[#8C8273] uppercase tracking-wider mb-6 pb-2 border-b border-[#ECE6DC]">
        <span>
          Showing <strong className="text-[#1A1A1A]">{filteredProducts.length}</strong> Haute Couture Gowns
        </span>
        <span className="hidden sm:inline">Made to Measure Available on All Commissions</span>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-[#FAF8F5] border border-[#DDD6CB] p-16 text-center space-y-4 my-8">
          <h3 className="text-2xl font-serif text-[#1A1A1A]">No Matching Creations</h3>
          <p className="text-xs text-[#6B655C] max-w-md mx-auto leading-relaxed">
            We couldn’t find any gowns matching your current filters. Reset the filters to explore the entire fashionierMind archive.
          </p>
          <button
            onClick={resetFilters}
            className="px-6 py-2.5 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#8E795D] transition-colors rounded-sm"
          >
            Show All Creations
          </button>
        </div>
      ) : (
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 ${
            columns === 2 ? 'lg:grid-cols-2 gap-12' : 'lg:grid-cols-3 gap-8 sm:gap-10'
          }`}
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
