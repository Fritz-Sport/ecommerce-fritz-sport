"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { urlForImage } from "@/sanity/lib/image"
import { useCart } from "react-use-cart"

import { CartItemsEmpty } from "../cart-items-empty"
import FormPagar from "./form-pagar"

export default function PaginaPagar() {
  const { items } = useCart()
  // console.log(items)

  const [domLoaded, setDomLoaded] = useState(false)

  useEffect(() => {
    setDomLoaded(true)
  }, [])

  return (
    <div className=" pt-20">
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Resumen del pedido</p>
          <p className="text-gray-400">
            Revisa tus artículos. Y seleccione un método de envío adecuado.
          </p>
          <div className="mt-8 space-y-3 rounded-lg border  px-2 py-4  sm:px-6">
            {domLoaded && items.length === 0 && <CartItemsEmpty />}
            {domLoaded &&
              items.map((el) => (
                <Link href={`/products/${el.slug}`}>
                  <li
                    key={el.id}
                    className="flex flex-col items-center  py-6 sm:flex-row sm:justify-between"
                  >
                    <div className="flex w-full items-center space-x-2 sm:space-x-4">
                      <img
                        className="shrink-0 rounded object-cover outline-none dark:border-transparent dark:bg-gray-500 sm:h-32 sm:w-32"
                        src={urlForImage(el.image).url()}
                        width={150}
                        alt="Polaroid camera"
                      />
                      <div className="flex h-full w-full items-center justify-center">
                        <div className="flex w-full flex-col justify-between">
                          <div className="flex w-full justify-between space-x-2 pb-2">
                            <div className="space-y-1">
                              <h2 className="laptop:text-base text-xs font-bold sm:pr-8   xl:text-lg">
                                {el.title}
                              </h2>
                              <p className="text-sm dark:text-gray-400">
                                <p className="text-sm font-bold">
                                  Cantidad : ({el.quantity})
                                </p>
                                <p className="text-sm font-bold">
                                  Talla : {el.talla}
                                </p>
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-base font-semibold xl:text-lg">
                                S/{el.itemTotal.toFixed(2)}
                              </p>
                            </div>
                          </div>
                          <div className="flex divide-x text-sm"></div>
                        </div>
                      </div>
                    </div>
                  </li>
                </Link>
              ))}
          </div>

          <p className="mt-8 text-lg font-medium">Métodos de envío</p>
          <form className="mt-5 grid gap-6">
            <div className="relative ">
              <label
                className="Select-none flex cursor-pointer rounded-lg border border-gray-300 p-4 peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50"
                htmlFor="radio_2"
              >
                <span className="absolute right-4 top-1/2 box-content block h-5 w-5 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-black peer-checked:border-gray-700 dark:bg-white"></span>
                <div className="ml-5">
                  <span className="mt-2 font-semibold">
                    Envio previa coordinación
                  </span>
                </div>
              </label>
            </div>
          </form>
        </div>
        {/* form */}
        <FormPagar />
      </div>
    </div>
  )
}
