import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import categoryApi from 'src/apis/category.api'

interface Props {
  classNames: string
}
export default function ListCategories({ classNames }: Props) {
  const { data: categoriesData } = useQuery({
    queryKey: ['get-categories'],
    queryFn: () => categoryApi.getCategories()
  })
  return (
    <div className={classNames}>
      {categoriesData &&
        categoriesData.data.data?.map((item) => {
          return (
            <Link to={`/product-list?category=${item.id}`} key={item.id} className='hover:underline cursor-pointer'>
              <div className='w-full h-30 rounded'>
                <img className='object-cover w-full h-full overflow-hidden' src={item.image} alt={item.image} />
              </div>
              <p className='mt-2 text-sm font-semibold leading-tight'>{item.name}</p>
            </Link>
          )
        })}
    </div>
  )
}
