import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from '@/views/HomeView.vue'
import HomeBanner from '@/components/HomeBanner.vue'
import ProductList from '@/components/ProductList.vue'
import ShopList from '@/components/ShopList.vue'
import ShopAd from '@/components/ShopAd.vue'
import CategoryList from '@/components/CategoryList.vue'
import { useProductsStore } from '@/stores/productStore.js'
import { useUserStore } from '@/stores/userStore.js'

// Mocking the store modules
vi.mock('@/stores/productStore.js', () => ({
  useProductsStore: vi.fn(() => ({
    fetchProducts: vi.fn(),
    products: [],
  })),
}))

vi.mock('@/stores/userStore.js', () => ({
  useUserStore: vi.fn(() => ({
    getCsrfToken: vi.fn(),
  })),
}))

describe('HomeView', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(HomeView)
  })

  it('should mount the component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('should render HomeBanner component', () => {
    expect(wrapper.findComponent(HomeBanner).exists()).toBe(true)
  })

  it('should render ProductList component with products', () => {
    const products = [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' },
    ]
    useProductsStore.mockReturnValue({
      fetchProducts: vi.fn(),
      products,
    })

    wrapper = mount(HomeView)

    expect(wrapper.findComponent(ProductList).exists()).toBe(true)
    expect(wrapper.findComponent(ProductList).props('products')).toEqual(
      products,
    )
  })

  it('should render ShopList component', () => {
    expect(wrapper.findComponent(ShopList).exists()).toBe(true)
  })

  it('should render ShopAd component', () => {
    expect(wrapper.findComponent(ShopAd).exists()).toBe(true)
  })

  it('should render CategoryList component', () => {
    expect(wrapper.findComponent(CategoryList).exists()).toBe(true)
  })

  it('should call fetchProducts on mounted', () => {
    const fetchProductsMock = vi.fn()
    useProductsStore.mockReturnValue({
      fetchProducts: fetchProductsMock,
      products: [],
    })

    mount(HomeView)

    expect(fetchProductsMock).toHaveBeenCalled()
  })

  it('should call getCsrfToken on mounted', () => {
    const getCsrfTokenMock = vi.fn()
    useUserStore.mockReturnValue({
      getCsrfToken: getCsrfTokenMock,
    })

    mount(HomeView)

    expect(getCsrfTokenMock).toHaveBeenCalled()
  })
})
