import Header from "@/components/--Utils/Header"
import CampaignForm from "@/components/Campaigns/CampaignForm"
import Layout from "@/components/Helper/Layout"
import CampaignEditFormSkeleton from "@/components/LoadingSkeleton/CampaignEditFormSkeleton"
import { useSelectACampaignQuery } from "@/store/APIs/campaignApi"
import { useRouter } from "next/router"
import { useEffect } from "react"

const NewCampaign = () => {
  const router = useRouter()
  const id = router?.query?.id
  useEffect(() => {
    if (!router.isReady) return
  }, [router])

  const { data: campaignData, isLoading: campaignDataIsLoading } = useSelectACampaignQuery(id)
  const theCampaign = {
    name: campaignData?.name ?? "",
    from_date: campaignData?.from_date ?? "",
    to_date: campaignData?.to_date ?? "",
    total_budget: campaignData?.total_budget ?? "",
    daily_budget: campaignData?.daily_budget ?? "",
    creative_upload: campaignData?.creative_upload ?? "",
  }

  return (
    <Layout>
      <Header headerText="EDIT CAMPAIGN" />
      {campaignDataIsLoading && <CampaignEditFormSkeleton />}
      {!campaignDataIsLoading && (
        <CampaignForm theCampaign={theCampaign} campaignId={id} formId="edit-campaign" newCampaign={false} />
      )}
    </Layout>
  )
}

export default NewCampaign