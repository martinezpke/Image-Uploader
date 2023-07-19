from django.http import JsonResponse
from django.views import View
from django.middleware.csrf import get_token
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from cloudinary import api, uploader
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import random, string

class MyView(View):
    
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    
    def post(self, request):
        img = request.FILES.get('img')
        if img:
            fileName = img.name
            aux = fileName.split(".")
            fileExt = aux[len(aux) - 1]
            
            # Generar un nuevo nombre al azar
            random_name = ''.join(random.choices(string.ascii_letters + string.digits, k=10))
            
            # Concatenar el nuevo nombre con la extensión del archivo
            newName = f"file-{random_name}.{fileExt}"
            
            # Guarda la imagen en la carpeta temp/name
            image_path = default_storage.save('temp/' + newName, ContentFile(img.read()))
            
            # llama el metodo uploader_file para obtener la URL 
            image_url = self.uploader_file(image_path, newName)
            
            return JsonResponse({'mensaje': 'Imagen recibida correctamente.', 'url': image_url})
        
        # Si no se envió ninguna imagen, devuelve un mensaje de error
        return JsonResponse({'error': 'No se envió ninguna imagen.'})
    
    def uploader_file(self, image, name):
        # Cargar la imagen desde la ubicación local a Cloudinary
        result = uploader.upload(image)
        
        # Borrar la imagen del directorio "temp/"
        default_storage.delete('temp/' + name)
        
        # Obtener la URL pública de la imagen en Cloudinary
        return result['secure_url']
    
""" class get_csrf_token(View):
    def get(self, request):
        token = get_token(request)
        return JsonResponse({'csrfToken': token}) """
     
