import { z } from 'zod'
import { prisma } from '~/utils/prisma'

const AccountSubscription = z.object({
  subscriptionId: z.string()
})

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const body = await readBody<Required<z.infer<typeof AccountSubscription>>>(event)
  AccountSubscription.parse(body)
  return prisma.accountSubscription.create({ data: { accountId: id, subscriptionId: body.subscriptionId } })
})
