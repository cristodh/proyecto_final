from django.urls import path

from .views import CampaignListCreateView
from .views import CategoryListCreateView
from .views import MediaContentListCreateView
from .views import DonationListCreateView

urlpatterns = [
    path('new_campaigns/', CampaignListCreateView.as_view()),
    path('new_categories/', CategoryListCreateView.as_view()),
    path('new_media-content/', MediaContentListCreateView.as_view()),
    path('new_donations/', DonationListCreateView.as_view()),
]