from rest_framework import viewsets, status
from bmstu_lab.serializers import *
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_jwt.utils import jwt_decode_handler
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import HttpResponse

from bmstu_lab.models import *
# Create your views here.


@api_view(['GET', 'POST'])
def getJson(request):
    if request.method == 'POST':
        user = User.objects.create_user(request.data['username'], request.data['email'], request.data['password'])
        user.save()
        refresh = RefreshToken.for_user(user)
        return HttpResponse(
            '{"refresh": "' + str(refresh) + '", "access": "' + str(refresh.access_token) + '"}')
    else:
        return HttpResponse("{'status': 'nok'}")

@api_view()
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def user(request: Request):
    print(UserSerializer(request.user).data)
    return Response({
        'data': UserSerializer(request.user).data
    })


class FootballersDepthViewSet(viewsets.ModelViewSet):
    serializer_class = FootballersDepthSerializer
    def get_queryset(self):
        queryset = Footballers.objects.all()
        if self.request.method == 'GET':
            params = self.request.query_params.dict()
            try:
                if params['nameQ'] == '':
                    pass
                else:
                    queryset = queryset.filter(name__icontains=params['nameQ'])
            except:
                pass
            try:
                if params['positionQ'] == '':
                    pass
                else:
                    queryset = queryset.filter(brand__icontains=params['positionQ'])
            except:
                pass
            try:
                queryset = queryset.filter(price__lte=params['max_cost'])
            except:
                pass
            try:
                queryset = queryset.filter(price__gte=params['min_cost'])
            except:
                pass
        return queryset.order_by('name')


class FootballersViewSet(viewsets.ModelViewSet):
    queryset = Footballers.objects.all()
    serializer_class = FootballersSerializer
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        print(instance)
        user_id = False
        if request.headers.get("Authorization"):
            decoded_payload = jwt_decode_handler(request.headers.get("Authorization")[7:])
            user_id = decoded_payload.get('user_id')
            print(User.objects.get(id=user_id).is_superuser)
        if user_id:
            if User.objects.get(id=user_id).is_superuser:
                instance.name = request.data.get("name")
                instance.position = request.data.get("position")
                instance.age = request.data.get("age")
                instance.id_team = request.data.get("id_team")
                instance.price = request.data.get("price")
                instance.description = request.data.get("description")
                instance.save()
                return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_403_FORBIDDEN)

    def destroy(self, request, *args, **kwargs):
        user_id = False
        if request.headers.get("Authorization"):
            decoded_payload = jwt_decode_handler(request.headers.get("Authorization")[7:])
            user_id = decoded_payload.get('user_id')
            print(User.objects.get(id=user_id).is_superuser)
        if user_id:
            if User.objects.get(id=user_id).is_superuser:
                instance = self.get_object()
                self.perform_destroy(instance)
                return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_403_FORBIDDEN)

@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
class OrdersViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrdersSerializer
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        user_id = False
        if request.headers.get("Authorization"):
            decoded_payload = jwt_decode_handler(request.headers.get("Authorization")[7:])
            user_id = decoded_payload.get('user_id')
            print(User.objects.get(id=user_id).is_superuser)
        if user_id:
            if User.objects.get(id=user_id).is_superuser:
                instance.status = request.data.get("status")
                instance.save()
                return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_403_FORBIDDEN)

@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
class OrdersDepthViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by('order_date')
    serializer_class = OrdersDepthSerializer

    def get_queryset(self):
        queryset = Order.objects.all().order_by('-id')
        params = self.request.query_params.dict()
        if len(params) > 0:
            if params['id']:
                queryset = Order.objects.filter(customer_id=params['id'])
        return queryset

class OrdersDateViewSet(viewsets.ModelViewSet):
    serializer_class = OrdersDepthSerializer
    def get_queryset(self):
        queryset = Order.objects.all()
        if self.request.method == 'GET':
            params = self.request.query_params.dict()
            try:
                if params['order_date'] == '':
                    pass
                else:
                    queryset = queryset.filter(order_date__icontains=params['order_date'])
                    queryset = queryset.order_by('order_date')
            except:
                pass
        count = queryset.count()
        print("Количество заказов", params['order_date'],"-", count)
        return queryset

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('username')
    serializer_class = UserSerializer  # Сериализатор для модели
