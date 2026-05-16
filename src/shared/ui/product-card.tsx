import type { MenuItem } from '@entities/menu-item';

interface ProductCardProps {
  item: MenuItem;
  onClick?: (id: number) => void;
}

export function ProductCard({ item, onClick }: ProductCardProps) {
  return (
    <div
      className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100 dark:border-gray-700"
      onClick={() => onClick?.(item.id)}
    >
      <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-700 overflow-hidden">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-gray-900 dark:text-white text-lg line-clamp-1">
            {item.name}
          </h3>
        </div>
        
        {item.description && (
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
            {item.description}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-purple-600 dark:text-purple-400">
            ${item.price.toFixed(2)}
          </span>
          
          {item.categories.length > 0 && (
            <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
              {item.categories[0].name}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
